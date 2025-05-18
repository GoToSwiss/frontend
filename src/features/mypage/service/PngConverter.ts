interface BlobResult {
  blob: Blob;
  width: number;
  height: number;
}

export default async function rasterize(svg: SVGElement): Promise<BlobResult> {
  return new Promise((resolve, reject) => {
    const rect = svg.getBoundingClientRect();
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = rect.width;
        canvas.height = rect.height;
        const context = canvas.getContext('2d');

        if (!context) {
          reject(new Error('Failed to get 2D context'));
          return;
        }

        context.fillStyle = 'white';
        context.fillRect(0, 0, rect.width, rect.height);
        context.drawImage(image, 0, 0, rect.width, rect.height);

        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url); // Clean up
          if (blob) {
            resolve({ blob, width: rect.width, height: rect.height });
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(error);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG image'));
    };

    image.src = url;
  });
}
