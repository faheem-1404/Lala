"use client";

/** Direct lights: warm key, gold rim, faint cream fill. Shadows off for performance. */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.18} color="#f8e6d1" />
      <spotLight position={[-4, 5, 4]} angle={0.5} penumbra={0.9} intensity={38} color="#ffd6a0" decay={2} distance={30} />
      <spotLight position={[5, 3, -3]} angle={0.6} penumbra={1} intensity={26} color="#f1c45f" decay={2} distance={30} />
      <pointLight position={[3, -1, 4]} intensity={6} color="#f8e6d1" decay={2} distance={20} />
      <pointLight position={[0, -3, 0]} intensity={4} color="#861e2c" decay={2} distance={14} />
    </>
  );
}
