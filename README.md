# Withme_ProxyServer

## POST /caption, /ocr
NUGU 에서 접근 가능한 경로

캔들의 고유값을 필요로 합니다.

## Socket /
Handshake: { mobileID: string }

Handshake로 모바일 디바이스의 고유값을 넘겨줘야 합니다.

이벤트
* ImageCapture

### ImageCapture to Server
{ imageData: string }

imageData는 이미지를 base64로 변환한 형식을 사용합니다.

### ImageCapture to Client
이벤트가 발생하면 이미지 데이터를 base64로 인코딩하여

ImageCapture 이벤트로 다시 서버에 전송하여야 합니다.
