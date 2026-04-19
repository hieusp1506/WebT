import { useState } from "react";

type UnitSystem = "metric" | "imperial";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  advice: string;
  emoji: string;
  min: number;
  max: number;
}

function getBMIResult(bmi: number): BMIResult {
  if (bmi < 16) {
    return {
      bmi,
      category: "Gầy độ III (Rất nguy hiểm)",
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      advice: "Bạn đang thiếu cân nghiêm trọng. Hãy gặp bác sĩ ngay để được tư vấn dinh dưỡng và điều trị.",
      emoji: "⚠️",
      min: 0,
      max: 16,
    };
  } else if (bmi < 17) {
    return {
      bmi,
      category: "Gầy độ II (Nguy hiểm)",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      advice: "Bạn đang thiếu cân ở mức độ nguy hiểm. Cần tăng cường dinh dưỡng và tham khảo ý kiến bác sĩ.",
      emoji: "😟",
      min: 16,
      max: 17,
    };
  } else if (bmi < 18.5) {
    return {
      bmi,
      category: "Gầy độ I (Nhẹ cân)",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      advice: "Bạn đang nhẹ cân. Hãy bổ sung chế độ ăn uống lành mạnh và tập thể dục đều đặn.",
      emoji: "😐",
      min: 17,
      max: 18.5,
    };
  } else if (bmi < 25) {
    return {
      bmi,
      category: "Bình thường (Lý tưởng)",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      advice: "Tuyệt vời! Bạn đang có cân nặng lý tưởng. Hãy duy trì lối sống lành mạnh hiện tại.",
      emoji: "😊",
      min: 18.5,
      max: 25,
    };
  } else if (bmi < 30) {
    return {
      bmi,
      category: "Thừa cân (Tiền béo phì)",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      advice: "Bạn đang thừa cân. Hãy điều chỉnh chế độ ăn uống và tăng cường vận động thể chất.",
      emoji: "😬",
      min: 25,
      max: 30,
    };
  } else if (bmi < 35) {
    return {
      bmi,
      category: "Béo phì độ I",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      advice: "Bạn đang béo phì độ I. Cần giảm cân ngay để tránh các bệnh về tim mạch, tiểu đường.",
      emoji: "😨",
      min: 30,
      max: 35,
    };
  } else if (bmi < 40) {
    return {
      bmi,
      category: "Béo phì độ II",
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      advice: "Bạn đang béo phì độ II. Đây là mức độ nguy hiểm, hãy gặp bác sĩ để có kế hoạch giảm cân phù hợp.",
      emoji: "😰",
      min: 35,
      max: 40,
    };
  } else {
    return {
      bmi,
      category: "Béo phì độ III (Rất nguy hiểm)",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      advice: "Bạn đang béo phì độ III rất nguy hiểm. Cần can thiệp y tế ngay lập tức.",
      emoji: "🚨",
      min: 40,
      max: 60,
    };
  }
}

const BMI_CATEGORIES = [
  { label: "< 16", desc: "Gầy độ III", color: "bg-blue-800" },
  { label: "16 – 17", desc: "Gầy độ II", color: "bg-blue-500" },
  { label: "17 – 18.5", desc: "Gầy độ I", color: "bg-cyan-400" },
  { label: "18.5 – 25", desc: "Bình thường", color: "bg-green-500" },
  { label: "25 – 30", desc: "Thừa cân", color: "bg-yellow-400" },
  { label: "30 – 35", desc: "Béo phì I", color: "bg-orange-500" },
  { label: "35 – 40", desc: "Béo phì II", color: "bg-red-500" },
  { label: "> 40", desc: "Béo phì III", color: "bg-red-700" },
];

export default function App() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState("");
  const [animateResult, setAnimateResult] = useState(false);

  const handleCalculate = () => {
    setError("");
    let weightKg = 0;
    let heightM = 0;

    if (unit === "metric") {
      const h = parseFloat(height);
      const w = parseFloat(weight);
      if (!h || !w || h <= 0 || w <= 0) {
        setError("Vui lòng nhập chiều cao và cân nặng hợp lệ.");
        return;
      }
      if (h < 50 || h > 250) {
        setError("Chiều cao phải nằm trong khoảng 50cm – 250cm.");
        return;
      }
      if (w < 2 || w > 500) {
        setError("Cân nặng phải nằm trong khoảng 2kg – 500kg.");
        return;
      }
      heightM = h / 100;
      weightKg = w;
    } else {
      const ft = parseFloat(heightFt);
      const inch = parseFloat(heightIn) || 0;
      const lb = parseFloat(weightLb);
      if (!ft || !lb || ft <= 0 || lb <= 0) {
        setError("Vui lòng nhập chiều cao và cân nặng hợp lệ.");
        return;
      }
      heightM = (ft * 12 + inch) * 0.0254;
      weightKg = lb * 0.453592;
    }

    const bmi = weightKg / (heightM * heightM);
    if (bmi > 100) {
      setError("Kết quả không hợp lệ. Vui lòng kiểm tra lại số liệu.");
      return;
    }

    setResult(getBMIResult(parseFloat(bmi.toFixed(1))));
    setAnimateResult(false);
    setTimeout(() => setAnimateResult(true), 50);
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
    setHeightFt("");
    setHeightIn("");
    setWeightLb("");
    setAge("");
    setGender("male");
    setResult(null);
    setError("");
    setAnimateResult(false);
  };

  const getIdealWeight = () => {
    if (!result) return null;
    let heightM = 0;
    if (unit === "metric") {
      heightM = parseFloat(height) / 100;
    } else {
      const ft = parseFloat(heightFt);
      const inch = parseFloat(heightIn) || 0;
      heightM = (ft * 12 + inch) * 0.0254;
    }
    const minIdeal = (18.5 * heightM * heightM).toFixed(1);
    const maxIdeal = (24.9 * heightM * heightM).toFixed(1);
    return { min: minIdeal, max: maxIdeal };
  };

  const ideal = result ? getIdealWeight() : null;

  // Gauge needle rotation: BMI 10 = -90deg, BMI 40 = 90deg
  const getNeedleRotation = (bmi: number) => {
    const clamped = Math.min(Math.max(bmi, 10), 45);
    return ((clamped - 10) / 35) * 180 - 90;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg mb-4">
          <span className="text-3xl">⚖️</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Máy Tính <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">BMI</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Body Mass Index – Chỉ số khối cơ thể</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-700 mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">1</span>
            Nhập thông tin của bạn
          </h2>

          {/* Unit Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
            <button
              onClick={() => { setUnit("metric"); setResult(null); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                unit === "metric"
                  ? "bg-white text-indigo-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🇻🇳 Hệ Mét (cm, kg)
            </button>
            <button
              onClick={() => { setUnit("imperial"); setResult(null); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                unit === "imperial"
                  ? "bg-white text-indigo-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🇺🇸 Hệ Anh (ft, lb)
            </button>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Giới tính</label>
            <div className="flex gap-3">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                  gender === "male"
                    ? "border-blue-400 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                <span className="text-xl">👨</span> Nam
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                  gender === "female"
                    ? "border-pink-400 bg-pink-50 text-pink-600"
                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                <span className="text-xl">👩</span> Nữ
              </button>
            </div>
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Tuổi (tùy chọn)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🎂</span>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Nhập tuổi của bạn"
                min={1}
                max={120}
                className="w-full pl-9 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-700 transition-colors"
              />
            </div>
          </div>

          {/* Height */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Chiều cao</label>
            {unit === "metric" ? (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📏</span>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Chiều cao (cm)"
                  className="w-full pl-9 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-700 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">cm</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📏</span>
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="Feet"
                    className="w-full pl-9 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-700 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">ft</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="Inches"
                    className="w-full px-3 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-700 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Cân nặng</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⚖️</span>
              {unit === "metric" ? (
                <>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Cân nặng (kg)"
                    className="w-full pl-9 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-700 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">kg</span>
                </>
              ) : (
                <>
                  <input
                    type="number"
                    value={weightLb}
                    onChange={(e) => setWeightLb(e.target.value)}
                    placeholder="Cân nặng (lb)"
                    className="w-full pl-9 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-700 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">lb</span>
                </>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <span>❌</span> {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCalculate}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              🧮 Tính BMI
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 active:scale-95 transition-all duration-200"
            >
              🔄 Đặt lại
            </button>
          </div>
        </div>

        {/* Result Card */}
        <div className="flex flex-col gap-6">
          {result ? (
            <div
              className={`bg-white rounded-3xl shadow-xl p-6 border border-gray-100 transition-all duration-500 ${
                animateResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">2</span>
                Kết quả của bạn
              </h2>

              {/* Gauge */}
              <div className="relative flex justify-center items-end mb-2" style={{ height: "130px" }}>
                <svg viewBox="0 0 200 110" className="w-64" xmlns="http://www.w3.org/2000/svg">
                  {/* Background arcs */}
                  <path d="M 20 100 A 80 80 0 0 1 42 42" stroke="#1e40af" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M 42 42 A 80 80 0 0 1 58 28" stroke="#3b82f6" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M 58 28 A 80 80 0 0 1 80 20" stroke="#22d3ee" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M 80 20 A 80 80 0 0 1 120 20" stroke="#22c55e" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M 120 20 A 80 80 0 0 1 142 28" stroke="#facc15" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M 142 28 A 80 80 0 0 1 158 42" stroke="#f97316" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M 158 42 A 80 80 0 0 1 175 75" stroke="#ef4444" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M 175 75 A 80 80 0 0 1 180 100" stroke="#b91c1c" strokeWidth="14" fill="none" strokeLinecap="round" />
                  {/* Needle */}
                  <g transform={`rotate(${getNeedleRotation(result.bmi)}, 100, 100)`}>
                    <line x1="100" y1="100" x2="100" y2="30" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="6" fill="#1f2937" />
                    <circle cx="100" cy="100" r="3" fill="white" />
                  </g>
                </svg>
              </div>

              {/* BMI Number */}
              <div className="text-center mb-4">
                <div className={`text-6xl font-extrabold ${result.color} transition-all duration-700`}>
                  {result.bmi}
                </div>
                <div className="text-gray-400 text-xs mt-1">kg/m²</div>
              </div>

              {/* Category Badge */}
              <div className={`${result.bgColor} ${result.borderColor} border-2 rounded-2xl px-4 py-3 text-center mb-4`}>
                <div className={`text-2xl mb-1`}>{result.emoji}</div>
                <div className={`font-bold text-base ${result.color}`}>{result.category}</div>
              </div>

              {/* Advice */}
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed mb-4">
                💡 {result.advice}
              </div>

              {/* Ideal weight */}
              {ideal && (
                <div className="bg-indigo-50 rounded-xl px-4 py-3 text-sm text-indigo-700 border border-indigo-100">
                  <span className="font-semibold">⚡ Cân nặng lý tưởng:</span>{" "}
                  <span className="font-bold">{ideal.min} – {ideal.max} kg</span>{" "}
                  (BMI 18.5 – 24.9)
                </div>
              )}

              {/* Age note */}
              {age && parseInt(age) < 18 && (
                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-700">
                  ⚠️ Lưu ý: BMI tiêu chuẩn áp dụng cho người ≥ 18 tuổi. Với trẻ em, cần dùng biểu đồ tăng trưởng chuyên biệt.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 flex flex-col items-center justify-center text-center min-h-64">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-400 text-sm font-medium">Nhập thông tin và nhấn<br /><strong className="text-indigo-500">Tính BMI</strong> để xem kết quả</p>
            </div>
          )}

          {/* BMI Table */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">📋</span>
              Bảng phân loại BMI (WHO)
            </h3>
            <div className="space-y-1.5">
              {BMI_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                    result && cat.desc === result.category.split(" (")[0]
                      ? "bg-indigo-50 border border-indigo-200 scale-[1.01]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${cat.color} flex-shrink-0`}></div>
                  <span className="text-xs font-semibold text-gray-600 w-20">{cat.label}</span>
                  <span className="text-xs text-gray-500">{cat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-xs text-gray-400">
        <p>⚠️ Kết quả chỉ mang tính tham khảo. Hãy tham khảo ý kiến bác sĩ để được tư vấn chính xác.</p>
        <p className="mt-1">BMI Calculator © 2025 – Được xây dựng với ❤️ cho sức khỏe cộng đồng</p>
      </div>
    </div>
  );
}
