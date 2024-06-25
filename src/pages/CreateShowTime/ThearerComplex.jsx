import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function ThearerComplex(props) {
  const { value, onSelect } = props;
  const [complex, setComplex] = useState([]);
  const [selectedComplex, setSelectedComplex] = useState(null);

  useEffect(() => {
    if (value) {
      https
        .get(
          `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`
        )
        .then((res) => {
          setComplex(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const handleComplexChange = (e) => {
    const selectedComplexId = e.target.value;
    const selectedComplex = complex.find((cumRap) => cumRap.maCumRap === selectedComplexId);
    setSelectedComplex(selectedComplex);
    onSelect({ target: { name: "maCumRap", value: selectedComplexId } });
  };

  const handleTheaterChange = (e) => {
    onSelect({ target: { name: "maRap", value: e.target.value } });
  };

  return (
    <div className="flex flex-col space-y-4">
      <select
        onChange={handleComplexChange}
        name="cumRap"
        className="form-select"
      >
        <option value="" disabled>Chọn cụm rạp</option>
        {complex.map((cumRap) => (
          <option value={cumRap.maCumRap} key={cumRap.maCumRap}>
            {cumRap.tenCumRap}
          </option>
        ))}
      </select>

      {selectedComplex && (
        <select onChange={handleTheaterChange} name="maRap" className="form-select">
          <option value="" disabled>Chọn rạp</option>
          {selectedComplex.danhSachRap.map((rap) => (
            <option value={rap.maRap} key={rap.maRap}>
              {rap.tenRap}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
