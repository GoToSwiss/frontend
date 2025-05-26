export default function MarkerSvg() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      {/* 바깥쪽 연한 원 */}
      <circle cx="24" cy="24" r="24" fill="rgba(30, 136, 229, 0.3)" />
      {/* 안쪽 진한 원 */}
      <circle cx="24" cy="24" r="16" fill="#1e88e5" />
    </svg>
  );
}
