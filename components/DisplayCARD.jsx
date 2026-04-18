export const DisplayCARD = ({ name }) => {
  if (!name) return null;

  return (
    <div className="result-card">
      <div className="result-card-header">
        <span className="result-card-booth">Booth {name?.Booth}</span>
        {name?.VoterID && (
          <span className="result-card-voter-id">{name.VoterID}</span>
        )}
      </div>

      <div className="result-card-name">{name?.Name}</div>

      {name?.Father_Husband && (
        <div className="result-card-father">
          Father / Husband: {name.Father_Husband}
        </div>
      )}

      {name?.Place && (
        <div className="result-card-place">{name.Place}</div>
      )}

      <div className="result-card-chips">
        <div className="result-chip">
          <div className="result-chip-label">Page</div>
          <div className="result-chip-value">{name?.PN ?? "—"}</div>
        </div>
        <div className="result-chip">
          <div className="result-chip-label">Serial No</div>
          <div className="result-chip-value">{name?.SN ?? "—"}</div>
        </div>
        <div className="result-chip">
          <div className="result-chip-label">Door</div>
          <div className="result-chip-value">{name?.House_Number ?? "—"}</div>
        </div>
        <div className="result-chip">
          <div className="result-chip-label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Phone
          </div>
          <div className="result-chip-value">{name?.Phone ?? "—"}</div>
        </div>
      </div>
    </div>
  );
};
