// custom.d.ts

declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.wav" {
  const src: string;
  export default src;
}
