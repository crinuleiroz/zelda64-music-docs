import React from 'react';

function DownloadPageIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z" />
    </svg>
  );
}

function DownloadFileIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z" />
      <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06z" />
    </svg>
  );
}


export default function GridCard({
  name,
  platforms = [],
  description,
  link,
  downloadType = 'page', // 'page' | 'file'
}) {
  const Icon = downloadType === 'file' ? DownloadFileIcon : DownloadPageIcon;

  return (
    <div className="card">
      <div className="card-header">
        <strong>{name}</strong>
        <span>
          {platforms.map((p) => (
            <code key={p}>{p}</code>
          ))}
        </span>
      </div>

      <hr style={{backgroundColor: 'var(--ifm-color-emphasis-200)', margin: '1rem 0'}}/>

      <div className="card-content">
        {description}
      </div>

      <hr style={{backgroundColor: 'var(--ifm-color-emphasis-200)', margin: '1rem 0'}}/>

      <div className="card-footer">
        <a href={link} target='_blank' rel='noopener noreferrer' className='card-download-link'>
          <strong>
            Download {downloadType}
          </strong>
          <Icon size={18} />
        </a>
      </div>
    </div>
  );
}
