import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'SENI - Transport Médical International';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 128,
            height: 128,
            background: '#005f73',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: 64,
            fontWeight: 'bold',
          }}
        >
          S
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: '#005f73',
            marginBottom: 20,
          }}
        >
          SENI
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#2a9d8f',
            textAlign: 'center',
            maxWidth: '80%',
            lineHeight: 1.5,
          }}
        >
          Transport Médical International
          <br />
          Assistance Sanitaire en Afrique
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 