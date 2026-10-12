<!-- SPDX-License-Identifier: MPL-2.0 -->

# ADE public contracts — draft v0.1

These transport-neutral objects define the boundary between ADE and a human, GUI, script, or external AI client.

| Object | Purpose |
| --- | --- |
| `TaskEnvelope` | Bounded goal, scope, constraints, and evidence references |
| `AnalysisReport` | Findings, blockers, next actions, and non-operational status |
| `BoundedContextPacket` | Selected context tied to exact goal and state digests |
| `ExternalProposal` | Unverified candidate submitted by an external client |
| `VerificationReceipt` | Explicit checks and the resulting candidate status |

The schemas are review drafts. They do not define a network transport and do not grant permission to apply a proposal.

