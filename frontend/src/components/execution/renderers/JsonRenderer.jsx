"use client";

import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

const JsonRenderer = ({ data }) => (
    <div className="rounded-xl overflow-hidden">
        <JsonView src={data} />
    </div>
);

export default JsonRenderer;