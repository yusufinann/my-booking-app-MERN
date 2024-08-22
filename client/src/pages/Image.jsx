/* eslint-disable react/prop-types */
export default function Image({ src, ...rest }) {
  // Ensure the image URL is correct
  const imageUrl = /^https?:\/\//i.test(src) ? src : `http://localhost:8000/uploads/${src}`;

  return (
    <img
      src={imageUrl}
      {...rest}
      alt="Uploaded"
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    />
  );
}
