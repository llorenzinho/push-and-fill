import React, { useState } from "react";

const ProgressBar = () => {
    const [perc, setPerc] = useState(0);

    return (
        <div className="progress-bar-container">
            <div class="progress" role="progressbar">
                <div class="progress-inner">
                    <div class="progress-indicator"></div>
                    <div class="progress-indicator"></div>
                </div>
                <span class="progress-label">
                    <strong>{perc}</strong>
                    <span>%</span>
                </span>
                </div>

                <div class="description">
                <span>progress percentage is </span>
                <input type="number" min="0" max="100" step="1" value="50" />
                <span>%</span>
                </div>

                <a href="https://codepen.io/mikoloism" class="watermark">@mikoloism</a>
        </div>
    );
};