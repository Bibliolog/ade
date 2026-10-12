// SPDX-License-Identifier: MPL-2.0
"use strict";

const payload = document.querySelector("#payloadJson");
const panels = [...document.querySelectorAll(".panel")];
const navItems = [...document.querySelectorAll(".nav-item")];
let currentObject = {};

function showPanel(panelId) {
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.panel === panelId));
  const objectByPanel = {
    task: currentObject.task || currentObject,
    analysis: currentObject.report || currentObject,
    proposal: currentObject.proposal || currentObject,
    verification: currentObject.receipt || currentObject
  };
  renderJson(objectByPanel[panelId] || {});
}

function renderJson(value) {
  payload.textContent = JSON.stringify(value, null, 2);
}

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function renderDemo() {
  currentObject = structuredClone(window.ADE_DEMO);
  const { task, report, proposal, receipt } = currentObject;

  document.querySelector("#goalInput").value = task.goal.statement;
  document.querySelector("#stateInput").value = task.scope.state_digest;
  document.querySelector("#scopeInput").value = task.scope.included_entities.join(", ");
  document.querySelector("#constraintInput").value = task.constraints[0].statement;

  setText("#taskState", "READY");
  setText("#analysisState", report.status);
  setText("#proposalState", "UNVERIFIED");
  setText("#findingCount", report.findings.length);
  setText("#blockerCount", report.blockers.length);
  setText("#actionCount", report.next_actions.length);
  setText("#reportBadge", report.status);

  const findingHtml = report.findings.map((finding) =>
    '<article class="finding"><strong>' + escapeHtml(finding.title) +
    '</strong><p>' + escapeHtml(finding.detail) + '</p></article>'
  ).join("");
  document.querySelector("#analysisContent").innerHTML = '<div class="finding-list">' + findingHtml + '</div>';
  document.querySelector("#proposalJson").textContent = JSON.stringify(proposal, null, 2);
  setText("#verificationBadge", receipt.status);

  const checkHtml = receipt.checks.map((check) =>
    '<li class="' + check.result.toLowerCase() + '">' + escapeHtml(check.statement) +
    ' — ' + escapeHtml(check.result) + '</li>'
  ).join("");
  document.querySelector("#checkList").innerHTML = checkHtml;
  showPanel("analysis");
}

function buildRequest() {
  const digest = document.querySelector("#stateInput").value.trim();
  const scope = document.querySelector("#scopeInput").value.split(",").map((item) => item.trim()).filter(Boolean);
  currentObject = {
    schema_version: "ade.task-envelope.v0.1",
    task_id: "local-draft",
    goal: {
      statement: document.querySelector("#goalInput").value.trim(),
      required_outcome: "Pending explicit definition"
    },
    scope: {
      state_digest: digest,
      included_entities: scope,
      excluded_entities: []
    },
    constraints: [{
      id: "C-1",
      statement: document.querySelector("#constraintInput").value.trim(),
      severity: "required"
    }],
    evidence_refs: []
  };
  setText("#taskState", "READY");
  setText("#analysisState", "NOT RUN");
  setText("#proposalState", "NONE");
  renderJson(currentObject);
}

function resetDemo() {
  currentObject = {};
  document.querySelectorAll("input, textarea").forEach((field) => { field.value = ""; });
  setText("#taskState", "DRAFT");
  setText("#analysisState", "NOT RUN");
  setText("#proposalState", "NONE");
  setText("#findingCount", "0");
  setText("#blockerCount", "0");
  setText("#actionCount", "0");
  document.querySelector("#analysisContent").innerHTML = "<strong>No report loaded</strong><p>Load the fixture to see the intended report structure.</p>";
  document.querySelector("#proposalJson").textContent = "No proposal loaded.";
  document.querySelector("#checkList").innerHTML = '<li class="muted">No checks loaded.</li>';
  setText("#verificationBadge", "NOT EVALUATED");
  renderJson({});
  showPanel("task");
}

navItems.forEach((item) => item.addEventListener("click", () => showPanel(item.dataset.panel)));
document.querySelector("#demoButton").addEventListener("click", renderDemo);
document.querySelector("#resetButton").addEventListener("click", resetDemo);
document.querySelector("#buildButton").addEventListener("click", buildRequest);
document.querySelector("#copyButton").addEventListener("click", async () => {
  const status = document.querySelector("#copyStatus");
  try {
    await navigator.clipboard.writeText(payload.textContent);
    status.textContent = "Copied to clipboard.";
  } catch {
    status.textContent = "Clipboard access was unavailable; select the JSON manually.";
  }
});

resetDemo();

