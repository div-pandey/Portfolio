import { useState, useRef, useEffect } from 'react';
import { NPM_PACKAGES, type NpmPackage } from '../../data/npmPackages';
import styles from './OpenSourceSection.module.css';

interface OpenSourceSectionProps {
  packages?: NpmPackage[];
}

export function OpenSourceSection({ packages = NPM_PACKAGES }: OpenSourceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  const isSingle = packages.length === 1;

  return (
    <section className={styles.section} id="opensource">
      <div
        ref={sectionRef}
        className={`${styles.revealBlur} ${visible ? styles.visible : ''}`}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Open Source</h2>
          <span className={styles.sectionNum}>05</span>
        </div>

        <p className={styles.leadText}>
          Production-grade CLI utilities and open source developer tools published to npm.
          Architected for zero friction, maximum speed, and clean developer workflows.
        </p>

        <div className={`${styles.grid} ${isSingle ? styles.gridSingle : ''}`}>
          {packages.map((pkg, idx) => {
            const installKey = `install-${idx}`;
            const setupKey = `setup-${idx}`;

            return (
              <article
                key={pkg.name || idx}
                className={styles.card}
                style={{ '--pkg-accent': pkg.color || '#8fbc8b' } as React.CSSProperties}
              >
                {/* Top bar: Badges & Links */}
                <div className={styles.cardTop}>
                  <div className={styles.badgeGroup}>
                    <span className={`${styles.badge} ${styles.badgePrimary}`}>
                      <span className={styles.badgeDot} />
                      npm package
                    </span>
                    {pkg.version && (
                      <span className={styles.badge}>v{pkg.version}</span>
                    )}
                    {pkg.license && (
                      <span className={styles.badge}>{pkg.license}</span>
                    )}
                  </div>

                  <div className={styles.linksGroup}>
                    {pkg.npmUrl && (
                      <a
                        href={pkg.npmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionLink}
                        title="View on npm"
                      >
                        <span className={styles.npmIcon}>npm</span>
                        <span>Registry</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    )}

                    {pkg.githubUrl && (
                      <a
                        href={pkg.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionLink}
                        title="View GitHub Repository"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    )}

                    {pkg.liveUrl && (
                      <a
                        href={pkg.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionLink}
                        title="View Live Site / Documentation"
                      >
                        <span>Docs</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Main Package Identity */}
                <div className={styles.identityRow}>
                  <div className={styles.nameBlock}>
                    <h3 className={styles.shortTitle}>{pkg.shortName}</h3>
                    {pkg.tagline && (
                      <span className={styles.packageTagline}>{pkg.tagline}</span>
                    )}
                    <span className={styles.packageName}>{pkg.name}</span>
                  </div>

                  {(pkg.weeklyDownloads || pkg.license) && (
                    <div className={styles.statsBar}>
                      {pkg.weeklyDownloads && (
                        <div className={styles.statItem}>
                          <span className={styles.statNum}>{pkg.weeklyDownloads}</span>
                          <span className={styles.statLabel}>Downloads</span>
                        </div>
                      )}
                      {pkg.weeklyDownloads && pkg.license && (
                        <div className={styles.statDivider} />
                      )}
                      {pkg.license && (
                        <div className={styles.statItem}>
                          <span className={styles.statNum}>{pkg.license}</span>
                          <span className={styles.statLabel}>License</span>
                        </div>
                      )}
                      <div className={styles.statDivider} />
                      <div className={styles.statItem}>
                        <span className={styles.statNum}>Node 18+</span>
                        <span className={styles.statLabel}>Runtime</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className={styles.description}>{pkg.description}</p>

                {/* Install Box */}
                <div className={styles.installBox}>
                  <div className={styles.installHeader}>
                    <span className={styles.installLabel}>Terminal Install</span>
                  </div>

                  <div className={styles.installRow}>
                    <code className={styles.installCode}>
                      <span className={styles.promptSymbol}>$</span>
                      {pkg.installCmd}
                    </code>
                    <button
                      type="button"
                      className={`${styles.copyBtn} ${copiedKey === installKey ? styles.copied : ''}`}
                      onClick={() => copyToClipboard(pkg.installCmd, installKey)}
                      title="Copy install command"
                      aria-label="Copy install command"
                    >
                      {copiedKey === installKey ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {pkg.setupCmd && (
                    <div className={styles.setupRow}>
                      <div className={styles.setupHint}>
                        <span>Then initialize with:</span>
                        <code className={styles.setupCmd}>
                          <span className={styles.promptSymbol}>$</span>
                          {pkg.setupCmd}
                        </code>
                      </div>
                      <button
                        type="button"
                        className={`${styles.copyBtn} ${copiedKey === setupKey ? styles.copied : ''}`}
                        onClick={() => copyToClipboard(pkg.setupCmd!, setupKey)}
                        title="Copy setup command"
                        aria-label="Copy setup command"
                      >
                        {copiedKey === setupKey ? (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Terminal Commands Dashboard / lcr list */}
                {pkg.terminal && (
                  <div className={styles.terminalWindow}>
                    <div className={styles.terminalBar}>
                      <div className={styles.terminalDots}>
                        <span className={`${styles.terminalDot} ${styles.terminalDotClose}`} />
                        <span className={`${styles.terminalDot} ${styles.terminalDotMin}`} />
                        <span className={`${styles.terminalDot} ${styles.terminalDotMax}`} />
                      </div>
                      <span className={styles.terminalTitle}>
                        zsh — {pkg.terminal.promptCmd || 'terminal'}
                      </span>
                      <span className={styles.terminalAction}>click command to copy</span>
                    </div>

                    <div className={styles.terminalBody}>
                      {pkg.terminal.promptCmd && (
                        <div className={styles.terminalPromptRow}>
                          <span className={styles.terminalPromptSign}>$</span>
                          <span className={styles.terminalPromptCmd}>{pkg.terminal.promptCmd}</span>
                        </div>
                      )}

                      {pkg.terminal.bannerTitle && (
                        <div className={styles.terminalBanner}>{pkg.terminal.bannerTitle}</div>
                      )}

                      {pkg.terminal.groups && pkg.terminal.groups.length > 0 && (() => {
                        const groups = pkg.terminal.groups!;
                        const hasGitShortcuts = groups.some((g) => g.category === 'Git shortcuts');

                        let col1 = groups;
                        let col2: typeof groups = [];

                        if (hasGitShortcuts) {
                          col1 = groups.filter((g) => g.category !== 'Git shortcuts');
                          col2 = groups.filter((g) => g.category === 'Git shortcuts');
                        } else if (groups.length > 2) {
                          const half = Math.ceil(groups.length / 2);
                          col1 = groups.slice(0, half);
                          col2 = groups.slice(half);
                        }

                        const renderGroup = (group: typeof groups[0], gIdx: number) => (
                          <div key={group.category || gIdx} className={styles.terminalGroup}>
                            <div className={styles.groupCategory}>{group.category}</div>
                            <div className={styles.groupDivider}>────────────────────</div>
                            <div className={styles.terminalItemList}>
                              {group.items.map((item, iIdx) => {
                                const cmdKey = `term-${idx}-${group.category}-${item.cmd}-${iIdx}`;
                                const isCopied = copiedKey === cmdKey;
                                const copyVal = item.copyValue || item.cmd;

                                return (
                                  <div
                                    key={iIdx}
                                    className={`${styles.terminalCommandItem} ${isCopied ? styles.itemCopied : ''}`}
                                    onClick={() => copyToClipboard(copyVal, cmdKey)}
                                    title={`Click to copy: ${copyVal}`}
                                  >
                                    <span className={styles.itemCmd}>{item.cmd}</span>
                                    <span className={styles.itemArrow}>→</span>
                                    <span className={styles.itemTarget}>{item.target}</span>
                                    {isCopied && (
                                      <span className={styles.itemCopiedBadge}>✓ copied</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );

                        return (
                          <div className={styles.terminalColumns}>
                            <div className={styles.terminalCol}>
                              {col1.map(renderGroup)}
                            </div>
                            {col2.length > 0 && (
                              <div className={styles.terminalCol}>
                                {col2.map(renderGroup)}
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {pkg.terminal.rawOutput && (
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--text-bright)' }}>
                          {pkg.terminal.rawOutput}
                        </pre>
                      )}
                    </div>
                  </div>
                )}

                {/* Feature Highlights */}
                {pkg.features && pkg.features.length > 0 && (
                  <div className={styles.featuresGrid}>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className={styles.featureItem}>
                        {feat.icon && <span className={styles.featureIcon}>{feat.icon}</span>}
                        <div className={styles.featureContent}>
                          <span className={styles.featureLabel}>{feat.label}</span>
                          <span className={styles.featureDetail}>{feat.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {pkg.tags && pkg.tags.length > 0 && (
                  <div className={styles.tagsRow}>
                    {pkg.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
