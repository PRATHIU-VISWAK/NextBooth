import { useContext, useState } from "react";
import { AppContext } from "./_app";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DisplayCARD } from "../components/DisplayCARD";

export default function FetchFHNAME() {
  const { INPUT, setINPUT } = useContext(AppContext);
  const [selectedBooth, setSelectedBooth] = useState("all");

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["FHNAME"],
    queryFn: async () => {
      try {
        const response = await axios.post(
          `/api/booths/FH_NAME?name=${INPUT}&booth=${selectedBooth}`
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
      <h1 className="search-page-title">Search by Relative's Name</h1>

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
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Enter relative's name..."
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
            {data?.map((name, index) => (
              <DisplayCARD name={name} key={index} />
            ))}
            {data?.length === 0 && (
              <div className="no-results">
                No voters found with this relative name
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

FetchFHNAME.pageTitle = "Search by Relative's Name";
