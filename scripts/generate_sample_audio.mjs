import fs from 'fs';
import path from 'path';

const audioDir = path.resolve('public/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Function to generate standard 16-bit PCM Mono WAV file
function createWavFile(filepath, durationSec, sampleRate, sampleGenerator) {
  const numSamples = Math.floor(durationSec * sampleRate);
  const blockAlign = 2; // 16-bit mono
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF identifier
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(1, 22); // NumChannels (1 = Mono)
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(byteRate, 28); // ByteRate
  buffer.writeUInt16LE(blockAlign, 32); // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write PCM samples
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = sampleGenerator(t, i, numSamples);
    // Clamp to [-1, 1]
    sample = Math.max(-1, Math.min(1, sample));
    // 16-bit integer
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  fs.writeFileSync(filepath, buffer);
  console.log(`Generated: ${filepath}`);
}

const sampleRate = 22050;

// 1. CLARIS Dysarthric Input (husky, jittery, low formant resolution)
createWavFile(path.join(audioDir, 'claris_input_dys.wav'), 3.0, sampleRate, (t) => {
  const f0 = 120 + Math.sin(t * 15) * 8 + (Math.random() - 0.5) * 20; // jitter
  const noise = (Math.random() - 0.5) * 0.25;
  const env = Math.sin(Math.min(Math.PI, t * Math.PI / 3.0));
  const fundamental = Math.sin(2 * Math.PI * f0 * t) * 0.4;
  const harmonic = Math.sin(2 * Math.PI * f0 * 2 * t) * 0.2;
  return (fundamental + harmonic + noise) * env * 0.7;
});

// 2. CLARIS Output Clean Restored (crisp harmonics, natural pitch contour, clean speech formant)
createWavFile(path.join(audioDir, 'claris_output_clean.wav'), 3.0, sampleRate, (t) => {
  const f0 = 140 + Math.sin(t * 3.5) * 15; // natural smooth prosody
  const env = Math.sin(Math.min(Math.PI, t * Math.PI / 3.0));
  const h1 = Math.sin(2 * Math.PI * f0 * t) * 0.45;
  const h2 = Math.sin(2 * Math.PI * f0 * 2 * t) * 0.25;
  const h3 = Math.sin(2 * Math.PI * f0 * 3 * t) * 0.15;
  const h4 = Math.sin(2 * Math.PI * f0 * 4 * t) * 0.08;
  return (h1 + h2 + h3 + h4) * env * 0.8;
});

// 3. Tongue2Speech Input (silent ultrasound / whispered breathy signal)
createWavFile(path.join(audioDir, 'tongue_input_us.wav'), 3.0, sampleRate, (t) => {
  const env = Math.sin(Math.min(Math.PI, t * Math.PI / 3.0));
  const breath = (Math.random() - 0.5) * 0.4;
  const whisperFormant = Math.sin(2 * Math.PI * 800 * t) * 0.15 * Math.sin(t * 8);
  return (breath + whisperFormant) * env * 0.5;
});

// 4. Tongue2Speech Output Synthesized (reconstructed acoustic voice from spatio-temporal features)
createWavFile(path.join(audioDir, 'tongue_output_syn.wav'), 3.0, sampleRate, (t) => {
  const f0 = 160 + Math.cos(t * 4.0) * 12;
  const env = Math.sin(Math.min(Math.PI, t * Math.PI / 3.0));
  const h1 = Math.sin(2 * Math.PI * f0 * t) * 0.4;
  const h2 = Math.sin(2 * Math.PI * f0 * 2 * t) * 0.28;
  const h3 = Math.sin(2 * Math.PI * f0 * 3 * t) * 0.18;
  return (h1 + h2 + h3) * env * 0.85;
});

console.log('Audio generation complete!');
