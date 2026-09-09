import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ManagerInteractiveCockpit() {
    const [approved, setApproved] = useState(false)
    const [rewardPoints, setRewardPoints] = useState(650)
    const [activeTab, setActiveTab] = useState<"exception" | "analytics" | "rewards">("exception")

    return (
        <div className="v4-mgr-cockpit">
            {/* Window Header */}
            <div className="v4-mgr-cockpit__header">
                <div className="v4-mgr-cockpit__status">
                    <span className="v4-mgr-cockpit__dot" />
                    <span className="v4-mgr-cockpit__title">Manager Console &bull; Live Preview</span>
                </div>
                <div className="v4-mgr-cockpit__tabs">
                    <button
                        type="button"
                        className={`v4-mgr-tab-btn ${activeTab === "exception" ? "active" : ""}`}
                        onClick={() => setActiveTab("exception")}
                    >
                        1-Click Approval
                    </button>
                    <button
                        type="button"
                        className={`v4-mgr-tab-btn ${activeTab === "analytics" ? "active" : ""}`}
                        onClick={() => setActiveTab("analytics")}
                    >
                        Team Analytics
                    </button>
                    <button
                        type="button"
                        className={`v4-mgr-tab-btn ${activeTab === "rewards" ? "active" : ""}`}
                        onClick={() => setActiveTab("rewards")}
                    >
                        Reward Pool
                    </button>
                </div>
            </div>

            {/* Window Body */}
            <div className="v4-mgr-cockpit__body">
                <AnimatePresence mode="wait">
                    {activeTab === "exception" && (
                        <motion.div
                            key="exception"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="v4-mgr-view"
                        >
                            <div className="v4-mgr-badge-row">
                                <span className="v4-mgr-pill v4-mgr-pill--warning">
                                    <span className="v4-mgr-pulse" /> Routine trips self-book &bull; 1 Exception pending
                                </span>
                                <span className="v4-mgr-pill v4-mgr-pill--ai">
                                    AI Confidence: <b>98%</b>
                                </span>
                            </div>

                            {/* Exception Trip Card */}
                            <div className={`v4-mgr-card ${approved ? "v4-mgr-card--approved" : ""}`}>
                                <div className="v4-mgr-card__top">
                                    <div className="v4-mgr-avatar">SJ</div>
                                    <div className="v4-mgr-card__meta">
                                        <div className="v4-mgr-card__name">Sarah Jenkins</div>
                                        <div className="v4-mgr-card__sub">Head of Product &bull; London Onsite</div>
                                    </div>
                                    <div className="v4-mgr-card__price">
                                        <div className="v4-mgr-card__amt">$1,840</div>
                                        <div className="v4-mgr-card__overage">+$120 over policy cap</div>
                                    </div>
                                </div>

                                <div className="v4-mgr-reasoning">
                                    <div className="v4-mgr-reasoning__icon">&bull;</div>
                                    <p className="v4-mgr-reasoning__text">
                                        <b>AI Context:</b> Flights booked 3 weeks ahead saved $420. Selected hotel is 0.2 mi from client HQ, saving ~$160 in local transit.
                                    </p>
                                </div>

                                <div className="v4-mgr-actions">
                                    {approved ? (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="v4-mgr-approved-state"
                                        >
                                            <span className="v4-mgr-check">&check;</span>
                                            <span>Trip approved in 1 glance &bull; Auto-ticketed &amp; ERP logged</span>
                                            <button
                                                type="button"
                                                onClick={() => setApproved(false)}
                                                className="v4-mgr-reset-btn"
                                            >
                                                Undo
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                className="v4-btn v4-btn--solid v4-btn--sm"
                                                onClick={() => setApproved(true)}
                                            >
                                                Approve in 1-Click
                                            </button>
                                            <button
                                                type="button"
                                                className="v4-btn v4-btn--secondary v4-btn--sm"
                                                onClick={() => setApproved(true)}
                                            >
                                                Review Context
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "analytics" && (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="v4-mgr-view"
                        >
                            <div className="v4-mgr-metrics-grid">
                                <div className="v4-mgr-stat-box">
                                    <span className="v4-mgr-stat-label">Team Spend vs Budget</span>
                                    <span className="v4-mgr-stat-val">$48,250 <small>/ $60k</small></span>
                                    <div className="v4-mgr-prog-bar">
                                        <div className="v4-mgr-prog-fill" style={{ width: "80.4%" }} />
                                    </div>
                                    <span className="v4-mgr-stat-hint">80.4% used &bull; On track for Q3</span>
                                </div>
                                <div className="v4-mgr-stat-box">
                                    <span className="v4-mgr-stat-label">Policy Compliance</span>
                                    <span className="v4-mgr-stat-val text-green">97.8%</span>
                                    <span className="v4-mgr-stat-hint">+4.2% since automated guardrails</span>
                                </div>
                                <div className="v4-mgr-stat-box">
                                    <span className="v4-mgr-stat-label">Travel Outcomes Met</span>
                                    <span className="v4-mgr-stat-val">100%</span>
                                    <span className="v4-mgr-stat-hint">14 trips completed &bull; 0 delays</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "rewards" && (
                        <motion.div
                            key="rewards"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="v4-mgr-view"
                        >
                            <div className="v4-mgr-rewards-box">
                                <div className="v4-mgr-rewards-header">
                                    <div>
                                        <div className="v4-mgr-card__name">Quarterly Team Points Pool</div>
                                        <div className="v4-mgr-card__sub">Reward employees who book smart and in-policy</div>
                                    </div>
                                    <div className="v4-mgr-points-pill">
                                        Pool: <b>10,000 pts</b>
                                    </div>
                                </div>

                                <div className="v4-mgr-slider-container">
                                    <div className="v4-mgr-slider-label">
                                        <span>Recognize Marcus Vance (Saved $420 on flights)</span>
                                        <span className="v4-mgr-slider-val">+{rewardPoints} pts</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100"
                                        max="1500"
                                        step="50"
                                        value={rewardPoints}
                                        onChange={(e) => setRewardPoints(Number(e.target.value))}
                                        className="v4-mgr-slider"
                                    />
                                    <div className="v4-mgr-slider-track-text">
                                        <span>Allocated to Marcus &bull; Redeemable for personal hotels or gift cards</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
