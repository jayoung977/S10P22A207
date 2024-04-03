# -*- coding: utf-8 -*-
from flask import Flask
import schedule
import time
from pykrx import stock
from sqlalchemy import create_engine, Integer, BigInteger, Float
import pandas as pd
from datetime import datetime
from pyspark.sql import SparkSession
from pyspark.sql.functions import lit
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType, DateType, LongType
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

def get_database_url():
    return f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{os.getenv('MYSQL_PASSWORD')}@{os.getenv('MYSQL_HOST')}:{os.getenv('MYSQL_PORT')}/{os.getenv('MYSQL_DATABASE')}"

def run_stock_data_collection():
    engine = create_engine(get_database_url())
    new_column_names = {
        "시가": "market_price",
        "고가": "high_price",
        "저가": "low_price",
        "종가": "end_price",
        "거래량": "trading_volume",
        "등락률": "change_rate"
    }

    # 오늘 날짜의 1일 계산
    today = datetime.now()
    start_date = today.strftime("%Y%m%d")
    end_date = today.strftime("%Y%m%d")

    tickers = stock.get_market_ticker_list(market="ALL")
    # for ticker in tickers:
    #     try:
    #         stock_name = stock.get_market_ticker_name(ticker)
    #         print(ticker, stock_name)
    #         df = stock.get_market_ohlcv(start_date, end_date, ticker, adjusted=True)
    #         df['stock_code'] = ticker
    #         df.rename(columns=new_column_names, inplace=True)
    #         df.index.name = 'date'

    #         # 데이터 형식 변환
    #         df['market_price'] = df['market_price'].astype(int)
    #         df['high_price'] = df['high_price'].astype(int)
    #         df['low_price'] = df['low_price'].astype(int)
    #         df['end_price'] = df['end_price'].astype(int)
    #         df['trading_volume'] = df['trading_volume'].astype(int)
    #         df['change_rate'] = df['change_rate'].astype(float)

    #         table_name = 'stock_chart'
    #         df.to_sql(table_name, con=engine, if_exists='append', index=True, dtype={
    #             'market_price': Integer,
    #             'high_price': Integer,
    #             'low_price': Integer,
    #             'end_price': Integer,
    #             'trading_volume': BigInteger,
    #             'change_rate': Float
    #         })
    #     except Exception as e:
    #         print(f"Error processing ticker {ticker}: {str(e)}")
    #         continue

    # print("Stock data collection job executed.")

    # Parquet 파일 생성 작업 수행
    new_column_names = {
        "시가": "marketPrice",
        "고가": "highPrice",
        "저가": "lowPrice",
        "종가": "endPrice",
        "거래량": "tradingVolume",
        "등락률": "changeRate"
    }

    # 스키마 정의
    schema = StructType([
        StructField("date", StringType(), True),
        StructField("marketPrice", IntegerType(), True),
        StructField("highPrice", IntegerType(), True),
        StructField("lowPrice", IntegerType(), True),
        StructField("endPrice", IntegerType(), True),
        StructField("tradingVolume", LongType(), True),
        StructField("changeRate", DoubleType(), True),
        StructField("stockCode", StringType(), True),
    ])

    spark = SparkSession.builder \
        .appName("StockDataToParquet") \
        .getOrCreate()

    for ticker in tickers:
        stock_name = stock.get_market_ticker_name(ticker)
        print(ticker, stock_name)
        if ticker == "032800":
            continue
        df = stock.get_market_ohlcv(start_date, end_date, ticker, adjusted=True)
        df['stockCode'] = ticker
        df.rename(columns=new_column_names, inplace=True)
        df.index.name = 'date'
        # 날짜 column 추가
        df.reset_index(inplace=True)
        df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
        spark_df = spark.createDataFrame(df, schema=schema)
        spark_df = spark_df.withColumn("stockName", lit(stock_name))
        parquet_file_path = "hdfs://namenode:9000/zigeum/stock/stock_data.parquet"
        spark_df.write.mode('append').parquet(parquet_file_path)

    # Spark Session 종료
    spark.stop()

@app.route('/')
def home():
    return "Stock data collection job is running."

if __name__ == '__main__':
    # schedule.every().day.at("00:00").do(run_stock_data_collection)
    schedule.every(5).seconds.do(run_stock_data_collection)

    while True:
        schedule.run_pending()
        time.sleep(1)