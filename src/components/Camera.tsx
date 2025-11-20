import { useRef, useState } from "react";

export default function NativeCameraCapture() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  // 버튼 클릭 시 <input> 호출
  const openCamera = () => {
    inputRef.current?.click();
  };

  // 촬영 후 전달된 파일 받기
  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기 (Base64로 변환)
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);

    // 👉 file을 그대로 서버에 업로드 가능 (S3, 서버 API 등)
    alert(`촬영된 원본 파일: ${file}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* 촬영 버튼 */}
      <button
        onClick={openCamera}
        style={{ padding: "12px 24px", fontSize: 18 }}
      >
        📸 사진 촬영
      </button>

      {/* 숨겨진 카메라 input */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // 후면 카메라 우선 사용
        ref={inputRef}
        onChange={handleCapture}
        style={{ display: "none" }}
      />

      {/* 미리보기 */}
      {photo && (
        <div style={{ marginTop: 16 }}>
          <img src={photo} alt="captured" style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}
