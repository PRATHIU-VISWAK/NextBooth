import { useContext, useState } from "react";
import { AppContext } from "./_app";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DisplayCARD } from "../components/DisplayCARD";

export default function Fetchphone() {
  const { INPUT, setINPUT } = useContext(AppContext);
  const [selectedBooth, setSelectedBooth] = useState("all");

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["PHONE", INPUT, selectedBooth],
    queryFn: async () => {
      try {
        const response = await axios.post(
          `/api/booths/phone?phone=${INPUT}&booth=${selectedBooth}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: false,
    retry: 1,
  });

  return (
    <div className="search-page">
      <h1 className="search-page-title">Search by Phone Number</h1>

      <select
        value={selectedBooth}
        onChange={(e) => setSelectedBooth(e.target.value)}
        className="booth-dropdown"
      >
        <option value="all">All Booths</option>
        <optgroup label="── Wards ──" disabled />
        <option value="100">Ward 100 & 100A</option>
        <option value="100BC">Ward 100B & 100C</option>
        <option value="100D">Ward 100D</option>

        <optgroup label="── Individual Booth ──" disabled />
        <option value="76">Booth 76</option>
        <option value="77">Booth 77</option>
        <option value="78">Booth 78</option>
        <option value="82">Booth 82</option>
        <option value="83">Booth 83</option>
        <option value="191">Booth 191</option>
        <option value="192">Booth 192</option>
        <option value="193">Booth 193</option>
        <option value="194">Booth 194</option>
        <option value="195">Booth 195</option>
        <option value="196">Booth 196</option>
        <option value="197">Booth 197</option>
        <option value="198">Booth 198</option>
        <option value="199">Booth 199</option>
        <option value="200">Booth 200</option>
        <option value="201">Booth 201</option>
      </select>

      <div className="search-input-wrap">
        <span className="search-input-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter phone number (e.g. 9994463132)"
          className="search-input"
          onChange={(event) => setINPUT(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") refetch();
          }}
        />
      </div>

      <button className="search-submit-btn" onClick={refetch}>
        Search
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {isError && (
        <div className="search-error">
          Error: {error?.message || "Failed to retrieve voter information"}
        </div>
      )}

      <div className="mt-2">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="loader rounded-full border-4 h-10 w-10"></div>
          </div>
        ) : (
          <div className="results-grid">
            {data?.map((person, index) => (
              <DisplayCARD name={person} key={index} />
            ))}
            {data?.length === 0 && (
              <div className="no-results">
                No voters found with this phone number
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Fetchphone.pageTitle = "Search by Phone Number";
