<!-- SPDX-License-Identifier: MPL-2.0 -->

# Admissibility Driven Engineering

ADE is an experimental, domain-independent framework for bounded, traceable analysis and verifiable actions across diverse domains.

ADE — экспериментальная предметно-независимая среда ограниченного и прослеживаемого анализа с проверяемыми действиями в различных предметных областях.

This repository is an early public interface preview. It contains:

- a static interaction prototype;
- draft, provider-neutral JSON contracts;
- non-operational example payloads.

It does **not** contain the ADE decision engine, production integrations, or authority to apply changes to another system.

Software engineering is one of ADE's validation domains, not a boundary of its applicability.

Программная инженерия — один из полигонов ADE, а не граница её применимости.

## Preview locally

```bash
python3 -m http.server 8080 --directory docs
```

Then open `http://127.0.0.1:8080/`.

The same `docs/` directory is suitable for a later GitHub Pages preview. Publishing is intentionally not automated in this staging package.

## Interaction model

1. A client creates a bounded task.
2. ADE returns a structured analysis report.
3. A human or external tool may submit a proposal.
4. ADE evaluates that proposal separately and returns a verification receipt.

External proposals remain unverified until an explicit verification step completes. The interface never grants operational authority.

## LLM independence

ADE does not contain or require a large language model. Humans, software tools, and external AI models may use the same provider-neutral contracts as replaceable clients.

## Current status

`INTERFACE_PREVIEW / NOT_PRODUCTION_READY`

The contracts in `contracts/schemas/` are draft v0.1 objects for review. The browser prototype uses local fixture data and does not contact a server.

## License

The material in this repository is licensed under the Mozilla Public License 2.0. See `LICENSE` and `LICENSE_SCOPE.md`.

Contributions require a Developer Certificate of Origin 1.1 sign-off. See `CONTRIBUTING.md` and `DCO.md`.

This license applies only to material actually published in this repository. It does not license unpublished material.

