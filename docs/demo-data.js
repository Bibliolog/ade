// SPDX-License-Identifier: MPL-2.0
"use strict";

window.ADE_DEMO = {
  task: {
    schema_version: "ade.task-envelope.v0.1",
    task_id: "task-demo-001",
    goal: {
      statement: "Reduce repeated processing while preserving output identity",
      required_outcome: "A measurable reduction with unchanged output digests"
    },
    scope: {
      state_digest: "sha256:8a30d1e96c7f3b4c4b7c2e83a9bbbe3a670f4da4f41d237d99211bf4db517a26",
      included_entities: ["processing subsystem", "benchmark observations"],
      excluded_entities: ["deployment environment"]
    },
    constraints: [
      { id: "C-1", statement: "Output digest must remain unchanged", severity: "required" },
      { id: "C-2", statement: "Fallback must remain available", severity: "required" }
    ],
    evidence_refs: [
      { id: "E-1", kind: "benchmark", digest: "sha256:1f2a7c40fa894d361736c0d61fb72af8773493645d3f1092c1c52217dcfc0010" }
    ]
  },
  report: {
    schema_version: "ade.analysis-report.v0.1",
    report_id: "report-demo-001",
    task_ref: {
      task_id: "task-demo-001",
      input_digest: "sha256:1e3507e1ecb4d9d6c60d0ff95a867d19de086e4b2098156cb89412d28d7a0388"
    },
    status: "UNRESOLVED",
    findings: [
      { id: "F-1", title: "Repeated work is observable", detail: "The fixture identifies multiple consumers of the same immutable input." },
      { id: "F-2", title: "Identity condition is explicit", detail: "A digest comparison can reject non-equivalent output." }
    ],
    blockers: [
      { id: "B-1", statement: "The safe reuse boundary is not yet demonstrated." }
    ],
    next_actions: [
      { id: "A-1", statement: "Measure direct and shared processing at N=1, 4, and 16." },
      { id: "A-2", statement: "Reject mutable or unsealed shared inputs." }
    ],
    authorization: { operational_grant: false },
    semantic_digest: "sha256:d7bfd58aeb2f527ab16e08e5b7bc94993a669a5133f24b3549dfb54f72075f45"
  },
  proposal: {
    schema_version: "ade.external-proposal.v0.1",
    proposal_id: "proposal-demo-001",
    task_id: "task-demo-001",
    base_state_digest: "sha256:8a30d1e96c7f3b4c4b7c2e83a9bbbe3a670f4da4f41d237d99211bf4db517a26",
    proposer: { kind: "software", label: "external development client" },
    status: "EXTERNAL_PROPOSAL",
    rationale: "Reuse one validated immutable result for multiple consumers.",
    claimed_outcomes: ["Lower total processing cost for repeated consumers"],
    accepted_knowledge: false,
    operational_grant: false
  },
  receipt: {
    schema_version: "ade.verification-receipt.v0.1",
    verification_id: "verification-demo-001",
    proposal_id: "proposal-demo-001",
    base_state_digest: "sha256:8a30d1e96c7f3b4c4b7c2e83a9bbbe3a670f4da4f41d237d99211bf4db517a26",
    observed_state_digest: "sha256:8a30d1e96c7f3b4c4b7c2e83a9bbbe3a670f4da4f41d237d99211bf4db517a26",
    status: "UNRESOLVED",
    checks: [
      { id: "V-1", statement: "Output digests match", result: "PASS" },
      { id: "V-2", statement: "Immutable input boundary demonstrated", result: "PASS" },
      { id: "V-3", statement: "Target workload threshold established", result: "UNKNOWN" }
    ],
    evidence_refs: ["E-1"],
    operational_grant: false
  }
};

