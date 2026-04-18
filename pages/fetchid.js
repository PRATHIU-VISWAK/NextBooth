import { useContext } from "react";
import { AppContext } from "./_app";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DisplayCARD } from "../components/DisplayCARD";

export default function FetchID() {
  const { INPUT, setINPUT } = useContext(AppContext);

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["ID"],
    queryFn: async () => {
      try {
        const response = await axios.post(`/api/booths/ID?id=${INPUT}`);
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
      <h1 className="search-page-title">Search by Voter ID</h1>

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
          placeholder="Enter Voter ID..."
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
          <>
            {data && (
              <div className="results-grid">
                <DisplayCARD name={data} />
              </div>
            )}
            {data === null && (
              <div className="no-results">No voter found with this ID</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

FetchID.pageTitle = "Search by Voter ID";
