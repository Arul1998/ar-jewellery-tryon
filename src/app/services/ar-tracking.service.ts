import { Injectable } from '@angular/core';
import { Hands } from '@mediapipe/hands';
import { FaceDetection } from '@mediapipe/face_detection';

@Injectable({
  providedIn: 'root',
})
export class ArTrackingService {
  hands: Hands;
  face: FaceDetection;

  constructor() {
    this.hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    this.face = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.face.setOptions({
      minDetectionConfidence: 0.5,
    });
  }

  async detectHands(videoElement: HTMLVideoElement) {
    await this.hands.send({ image: videoElement });
  }

  async detectFace(videoElement: HTMLVideoElement) {
    await this.face.send({ image: videoElement });
  }
}
