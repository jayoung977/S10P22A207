package com.backend.api.domain.hadoop.dto;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeRateResponseDto implements Serializable {
	private int status;
	private String message;
	private List<ChangeRateCountDto> result;
}
