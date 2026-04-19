import { useState, useCallback } from "react";

type UnitSystem = "metric" | "imperial";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
  emoji: string;
  advice: string;
  range: string;
}

function getBMIResult(bmi: number): BMIResult {
  if (bmi < 16) {
    return {
      bmi,
      category: "Suy dinh dưỡng nặng",
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      gradient: "from-blue-400 to-blue-600",
      emoji: "🚨",
      advice: "Bạn đang trong tình trạng suy dinh dưỡng nghiêm trọng. Hãy gặp bác sĩ ngay để được tư vấn chế độ dinh dưỡng phù hợp.",
      range: "< 16",
    };
  } else if (bmi < 18.5) {
    return {
      bmi,
      category: "Thiếu cân",
      color: "text-cyan-700",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-300",
      gradient: "from-cyan-400 to-cyan-600",
      emoji: "⚠️",
      advice: "Bạn đang thiếu cân. Hãy bổ sung dinh dưỡng đầy đủ, tăng cường ăn uống lành mạnh và tập thể dục để xây dựng cơ bắp.",
      range: "16 – 18.4",
    };
  } else if (bmi < 25) {
    return {
      bmi,
      category: "Bình thường",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      gradient: "from-green-400 to-emerald-500",
      emoji: "✅",
      advice: "Chúc mừng! Cân nặng của bạn đang ở mức lý tưởng. Duy trì chế độ ăn uống lành mạnh và tập thể dục đều đặn nhé!",
      range: "18.5 – 24.9",
    };
  } else if (bmi < 30) {
    return {
      bmi,
      category: "Thừa cân",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      gradient: "from-yellow-400 to-orange-400",
      emoji: "⚠️",
      advice: "Bạn đang bị thừa cân. Hãy điều chỉnh chế độ ăn uống, giảm đường và chất béo, đồng thời tăng cường vận động thể chất.",
      range: "25 – 29.9",
    };
  } else if (bmi < 35) {
    return {
      bmi,
      category: "Béo phì độ I",
      color: "text-orange-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      gradient: "from-orange-400 to-red-400",
      emoji: "🔴",
      advice: "Bạn đang bị béo phì độ I. Cần tham khảo ý kiến bác sĩ và chuyên gia dinh dưỡng để có kế hoạch giảm cân phù hợp.",
      range: "30 – 34.9",
    };
  } else if (bmi < 40) {
    return {
      bmi,
      category: "Béo phì độ II",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      gradient: "from-red-500 to-rose-600",
      emoji: "🚨",
      advice: "Bạn đang bị béo phì độ II. Đây là mức nguy hiểm cho sức khỏe. Hãy gặp bác sĩ ngay để được điều trị và tư vấn chuyên sâu.",
      range: "35 – 39.9",
    };
  } else {
    return {
      bmi,
      category: "Béo phì độ III",
      color: "text-rose-800",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-400",
      gradient: "from-rose-600 to-red-800",
      emoji: "🚨",
      advice: "Bạn đang bị béo phì độ III (nghiêm trọng). Tình trạng này rất nguy hiểm đến tính mạng. Hãy đến bệnh viện để được điều trị ngay.",
      range: "≥ 40",
    };
  }
}

const BMI_CATEGORIES = [
  { label: "Suy dinh dưỡng nặng", range: "< 16", color: "bg-blue-500", width: "w-[8%]" },
  { label: "Thiếu cân", range: "16–18.4", color: "bg-cyan-400", width: "w-[8%]" },
  { label: "Bình thường", range: "18.5–24.9", color: "bg-green-500", width: "w-[22%]" },
  { label: "Thừa cân", range: "25–29.9", color: "bg-yellow-400", width: "w-[18%]" },
  { label: "Béo phì I", range: "30–34.9", color: "bg-orange-500", width: "w-[17%]" },
  { label: "Béo phì II", range: "35–39.9", color: "bg-red-500", width: "w-[15%]" },
  { label: "Béo phì III", range: "≥ 40", color: "bg-rose-700", width: "w-[12%]" },
];

function getBMIPosition(bmi: number): number {
  const clampedBMI = Math.min(Math.max(bmi, 10), 50);
  return ((clampedBMI - 10) / 40) * 100;
}

export default function App() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<(BMIResult & { date: string; height: string; weight: string })[]>([]);

  const handleCalculate = useCallback(() => {
    setError("");
    let weightInKg = 0;
    let heightInM = 0;

    if (unit === "metric") {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);
      if (!heightCm || !weightKg || isNaN(h) || isNaN(w)) {
        setError("Vui lòng nhập đầy đủ chiều cao và cân nặng hợp lệ.");
        return;
      }
      if (h <= 0 || h > 300) { setError("Chiều cao phải từ 1 đến 300 cm."); return; }
      if (w <= 0 || w > 700) { setError("Cân nặng phải từ 1 đến 700 kg."); return; }
      heightInM = h / 100;
      weightInKg = w;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const lb = parseFloat(weightLb);
      if (!weightLb || isNaN(lb) || (ft === 0 && inch === 0)) {
        setError("Vui lòng nhập đầy đủ chiều cao và cân nặng hợp lệ.");
        return;
      }
      const totalInches = ft * 12 + inch;
      if (totalInches <= 0 || totalInches > 120) { setError("Chiều cao không hợp lệ."); return; }
      if (lb <= 0 || lb > 1500) { setError("Cân nặng không hợp lệ."); return; }
      heightInM = totalInches * 0.0254;
      weightInKg = lb * 0.453592;
    }

    const bmiValue = weightInKg / (heightInM * heightInM);
    const bmiResult = getBMIResult(Math.round(bmiValue * 10) / 10);
    setResult(bmiResult);

    const heightLabel = unit === "metric"
      ? `${heightCm} cm`
      : `${heightFt}ft ${heightIn || 0}in`;
    const weightLabel = unit === "metric" ? `${weightKg} kg` : `${weightLb} lbs`;

    setHistory(prev => [
      {
        ...bmiResult,
        date: new Date().toLocaleString("vi-VN"),
        height: heightLabel,
        weight: weightLabel,
      },
      ...prev.slice(0, 9),
    ]);
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLb]);

  const handleReset = () => {
    setHeightCm(""); setWeightKg("");
    setHeightFt(""); setHeightIn(""); setWeightLb("");
    setAge(""); setGender("");
    setResult(null); setError("");
  };

  const idealWeightRange = result
    ? (() => {
        const hm = unit === "metric"
          ? parseFloat(heightCm) / 100
          : (parseFloat(heightFt) * 12 + (parseFloat(heightIn) || 0)) * 0.0254;
        const minW = (18.5 * hm * hm).toFixed(1);
        const maxW = (24.9 * hm * hm).toFixed(1);
        return { minW, maxW };
      })()
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 mb-4">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Máy Tính BMI</h1>
          <p className="text-gray-500 text-lg">Tính chỉ số khối cơ thể (Body Mass Index)</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-50 overflow-hidden">

          {/* Unit Toggle */}
          <div className="flex bg-gray-50 border-b border-gray-100">
            <button
              onClick={() => { setUnit("metric"); setResult(null); setError(""); }}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                unit === "metric"
                  ? "bg-white text-indigo-600 shadow-sm border-b-2 border-indigo-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🇻🇳 Hệ Mét (cm / kg)
            </button>
            <button
              onClick={() => { setUnit("imperial"); setResult(null); setError(""); }}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                unit === "imperial"
                  ? "bg-white text-indigo-600 shadow-sm border-b-2 border-indigo-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🇺🇸 Hệ Anh (ft / lbs)
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Height Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📏 Chiều cao
              </label>
              {unit === "metric" ? (
                <div className="relative">
                  <input
                    type="number"
                    value={heightCm}
                    onChange={e => setHeightCm(e.target.value)}
                    placeholder="Nhập chiều cao..."
                    min="1" max="300"
                    className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800 placeholder-gray-400 text-lg"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">cm</span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={e => setHeightFt(e.target.value)}
                      placeholder="Feet..."
                      min="0" max="9"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800 placeholder-gray-400 text-lg"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">ft</span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={heightIn}
                      onChange={e => setHeightIn(e.target.value)}
                      placeholder="Inch..."
                      min="0" max="11"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800 placeholder-gray-400 text-lg"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">in</span>
                  </div>
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏋️ Cân nặng
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={unit === "metric" ? weightKg : weightLb}
                  onChange={e => unit === "metric" ? setWeightKg(e.target.value) : setWeightLb(e.target.value)}
                  placeholder="Nhập cân nặng..."
                  min="1"
                  className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800 placeholder-gray-400 text-lg"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  {unit === "metric" ? "kg" : "lbs"}
                </span>
              </div>
            </div>

            {/* Optional: Age & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎂 Tuổi <span className="text-gray-400 font-normal">(tùy chọn)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="Tuổi..."
                    min="1" max="120"
                    className="w-full px-4 py-3 pr-14 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">tuổi</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Giới tính <span className="text-gray-400 font-normal">(tùy chọn)</span>
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as "male" | "female" | "")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-800 bg-white"
                >
                  <option value="">-- Chọn --</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-200 text-sm">
                <span>❌</span> {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCalculate}
                className="flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-lg"
              >
                Tính BMI
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition-all duration-200"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className={`mx-6 mb-6 rounded-2xl border-2 ${result.borderColor} ${result.bgColor} overflow-hidden`}>
              {/* BMI Score Header */}
              <div className={`bg-gradient-to-r ${result.gradient} p-5 text-white text-center`}>
                <div className="text-5xl font-black mb-1">{result.bmi.toFixed(1)}</div>
                <div className="text-lg font-semibold opacity-90">
                  {result.emoji} {result.category}
                </div>
              </div>

              {/* BMI Scale */}
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Thang đo BMI</p>
                <div className="relative">
                  <div className="flex rounded-full overflow-hidden h-4 w-full">
                    {BMI_CATEGORIES.map((cat, i) => (
                      <div key={i} className={`${cat.color} ${cat.width} h-4`} title={cat.label} />
                    ))}
                  </div>
                  {/* Indicator */}
                  <div
                    className="absolute -top-1 transform -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${getBMIPosition(result.bmi)}%` }}
                  >
                    <div className="w-3 h-6 bg-gray-800 rounded-full border-2 border-white shadow-lg" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0">
                  <span>10</span><span>16</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40+</span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 px-4 pb-4">
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium mb-1">📊 Phân loại</p>
                  <p className={`font-bold text-sm ${result.color}`}>{result.category}</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium mb-1">📐 Khoảng BMI</p>
                  <p className="font-bold text-sm text-gray-700">{result.range}</p>
                </div>
                {idealWeightRange && (
                  <div className="bg-white rounded-xl p-3 border border-gray-100 col-span-2">
                    <p className="text-xs text-gray-400 font-medium mb-1">⚖️ Cân nặng lý tưởng (BMI 18.5–24.9)</p>
                    <p className="font-bold text-sm text-green-600">
                      {idealWeightRange.minW} kg – {idealWeightRange.maxW} kg
                    </p>
                  </div>
                )}
              </div>

              {/* Advice */}
              <div className="mx-4 mb-4 bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">💡 Lời khuyên sức khỏe</p>
                <p className="text-sm text-gray-700 leading-relaxed">{result.advice}</p>
              </div>
            </div>
          )}
        </div>

        {/* BMI Table */}
        <div className="mt-6 bg-white rounded-3xl shadow-lg shadow-indigo-50 border border-indigo-50 overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-800">📋 Bảng Phân Loại BMI</h2>
            <p className="text-xs text-gray-500 mt-1">Theo tiêu chuẩn của Tổ chức Y tế Thế giới (WHO)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Phân loại</th>
                  <th className="text-center px-5 py-3 text-gray-500 font-semibold">Chỉ số BMI</th>
                  <th className="text-center px-5 py-3 text-gray-500 font-semibold">Nguy cơ</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Suy dinh dưỡng nặng", range: "< 16", risk: "Rất cao", riskColor: "text-blue-700 bg-blue-50", dot: "bg-blue-500" },
                  { cat: "Thiếu cân", range: "16 – 18.4", risk: "Cao", riskColor: "text-cyan-700 bg-cyan-50", dot: "bg-cyan-400" },
                  { cat: "Bình thường ✅", range: "18.5 – 24.9", risk: "Thấp", riskColor: "text-green-700 bg-green-50", dot: "bg-green-500" },
                  { cat: "Thừa cân", range: "25 – 29.9", risk: "Trung bình", riskColor: "text-yellow-700 bg-yellow-50", dot: "bg-yellow-400" },
                  { cat: "Béo phì độ I", range: "30 – 34.9", risk: "Cao", riskColor: "text-orange-700 bg-orange-50", dot: "bg-orange-500" },
                  { cat: "Béo phì độ II", range: "35 – 39.9", risk: "Rất cao", riskColor: "text-red-700 bg-red-50", dot: "bg-red-500" },
                  { cat: "Béo phì độ III", range: "≥ 40", risk: "Cực kỳ cao", riskColor: "text-rose-800 bg-rose-50", dot: "bg-rose-700" },
                ].map((row, i) => (
                  <tr key={i} className={`border-t border-gray-50 hover:bg-indigo-50/30 transition-colors ${result && result.category.startsWith(row.cat.replace(" ✅", "")) ? "bg-indigo-50 font-semibold" : ""}`}>
                    <td className="px-5 py-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${row.dot} flex-shrink-0`} />
                        {row.cat}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center text-gray-600 font-mono">{row.range}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.riskColor}`}>{row.risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 bg-white rounded-3xl shadow-lg shadow-indigo-50 border border-indigo-50 overflow-hidden">
            <button
              onClick={() => setShowHistory(v => !v)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-800">🕐 Lịch sử tính toán</h2>
                <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full">{history.length}</span>
              </div>
              <span className="text-gray-400 text-xl">{showHistory ? "▲" : "▼"}</span>
            </button>
            {showHistory && (
              <div className="border-t border-gray-50 divide-y divide-gray-50">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{h.emoji}</span>
                      <div>
                        <p className="font-bold text-gray-800">BMI: {h.bmi.toFixed(1)} – {h.category}</p>
                        <p className="text-xs text-gray-400">{h.date} · {h.height} · {h.weight}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${h.color}`}>#{i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6 pb-4">
          ⚠️ Chỉ số BMI chỉ mang tính tham khảo. Hãy tham khảo ý kiến bác sĩ để được tư vấn sức khỏe chính xác.
        </p>
      </div>
    </div>
  );
}
