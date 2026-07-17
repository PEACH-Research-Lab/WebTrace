// ============================================================
//  siteData.js 
// ============================================================

const siteData = {
  // ---- Hero Section ----
  title: 'WebTrace: Evaluating LLM Re-identification of Anonymized Text with Web Search',
  // logo: '/logo.png', 

  // ---- Authors ----
  authors: [
    { name: 'Jianing Wen', url: 'https://jianingwen.github.io/', affiliations: ['1'] },
    { name: 'Tianshi Li', url: 'https://tianshili.me/', affiliations: ['1'] },

  ],
  affiliations: [
    { id: '1', name: 'Khoury College of Computer Sciences, Northeastern University' },
    // { id: '2', name: 'University B' },
  ],

  // ---- Action Buttons ----
  links: [
    { label: 'Paper', url: 'https://arxiv.org/abs/xxxx.xxxxx', icon: '/WebTrace/icons/arxiv.svg' },
    { label: 'Code', url: 'https://github.com/you/repo', icon: '/WebTrace/icons/github.svg' },
    { label: 'Dataset', url: 'https://huggingface.co/datasets/peach-lab/webTrace', icon: '/WebTrace/icons/hf.svg' },
    { label: 'Evaluation Space', url: 'https://huggingface.co/spaces/peach-lab/webTrace_eval', icon: '/WebTrace/icons/hf.svg' },
  ],

  // ---- Highlight Box (between buttons and abstract) ----
  highlight: {
    arrowFrom: 'Dataset',   //label in links
    // text: `**WebTrace** is a simulated AI-user conversation dataset inspired by the Anthropic Interviewer Dataset, created for person re-identification evaluation. Transcripts and IDs are available as a gated dataset on HuggingFace. Because the ground-truth labels are real personal names, they are not publicly released for privacy reasons. To evaluate your system, submit your predictions to our grading service, which scores them against the hidden labels and returns your precision, recall, and F1.`,
    arrowTo: 'Evaluation Space',
    text: `**WebTrace** is a simulated AI-user conversation dataset inspired by the Anthropic Interviewer Dataset, designed for evaluating LLM re-identification risk. Because most identifying information in conversations takes the form of **contextual quasi-identifiers** rather than canonical named entities - traditional NER tools like Microsoft Presidio detect fewer than one-third of ground-truth identifiers. We take several steps to prevent misuse: Access to transcripts is **gated**, and ground-truth identity labels are **never released**. Instead, we offer a hosted {{evaluation service}} through which researchers can submit model predictions and receive only aggregate performance metrics`,
  },

  // ---- Teaser Image ----
  // teaserImage: 'https://picsum.photos/1200/500?random=1',
  // teaserCaption:
  //   'Overview of MyProject. Replace this with your own figure caption describing the teaser image.',

  // ---- Abstract ----
  abstract: `As Large Language Models (LLMs) are increasingly augmented with tool use capabilities such as web search, they can actively retrieve and cross-reference public information, creating privacy risks that go beyond memorization. One concrete manifestation is re-identification: we show that an LLM agent with web search access can link anonymized interview transcripts from the Anthropic Interviewer dataset to specific, named individuals. Yet without ground-truth identities, the accuracy and coverage of such attacks cannot be rigorously measured. 
To bridge this gap, we introduce WebTrace, a benchmark of synthetic interview transcripts grounded in 822 real individuals with verified identities.
We use this benchmark to evaluate seven open-weight and proprietary LLMs on re-identification accuracy, confidence calibration, token consumption, and latency.
Our findings reveal emergent memorization and associative capabilities of frontier models that achieve non-negligible re-identification success rate solely with parametric knowledge, and show that web search substantially increases re-identification success, making cheap, precise, and fully automated end-to-end attacks practically feasible. Open-weight models achieve performance on par with proprietary models while operating at roughly half the cost.
These results reveal a pressing dual-use privacy challenge for LLMs and establish WebTrace as a foundation for systematic measurement of adversarial privacy risks.`,

  dataPipeline: {
    // Full-width figure at top
    figure: '/WebTrace/images/DATA_CONSTRUCTION.png',  
    figureCaption: 'Figure 1: Overview of the four-stage data construction pipeline.',

    // 4.1 Data Construction
    construction: {
      title: 'Data Construction Pipeline',
      intro: 'Our pipeline proceeds in four stages to construct realistic synthetic interviews grounded in real individuals.',
      stages: [
        {
          name: 'Sourcing from Reddit',
          text: 'We draw from the r/IAmA subreddit where users voluntarily share professional self-descriptions, including who they are, what they do, and URLs pointing to personal websites or portfolios. This sourcing strategy directly supports **grounded identity**.',
        },
        {
          name: 'URL Extraction & Filtering',
          text: 'From each user\'s post, we extract all self-disclosed URLs and remove users who provide none. We fetch the content of each URL; users whose URLs all fail to return accessible content are also removed. After filtering, **822 individuals** remain, each associated with at least one URL whose content has been successfully retrieved.',
        },
        {
          name: 'Attribute Extraction',
          text: 'For each of the 822 individuals, we provide an LLM with the fetched web content to extract attributes ranging from specific named entities (e.g., institutional affiliations, publication titles, project names) to broader professional descriptors (e.g., research area, career stage).',
        },
        {
          name: 'Synthetic Interview Generation',
          text: 'To simulate **naturalistic self-disclosure**, we follow the format of the Anthropic Interviewer dataset: a fixed set of interviewer questions with follow-up probes adapted to preceding answers. The LLM generates a multi-turn transcript grounded in extracted attributes, prioritizing **conversational realism** over attribute coverage.',
        },
      ],
    },

    // 4.2 Data Validation — prose left, visual right
    validation: {
      title: 'Synthetic Data Validation',

      sections: [
        {
          id: '1.',
          title: 'Fidelity: Human Distinguishability',
          text: 'Evaluators achieved an overall accuracy of **49.3%**, statistically indistinguishable from the 50% chance baseline. The proportions of transcripts predicted as real and synthetic are nearly identical across the actual splits, indicating that synthetic transcripts are **largely indistinguishable** from real ones.',
          visual: 'matrix',
          matrix: {
            headers: ['', 'Pred. Real', 'Pred. Synthetic'],
            rows: [
              ['Actual Real',      '103 (TP)', '47 (FN)'],
              ['Actual Synthetic', '105 (FP)', '45 (TN)'],
            ],
            caption: 'We sampled 50 synthetic interviews from WebTrace and 50 real interviews from the Anthropic Interviewer dataset, divided into 10 balanced batches. Each batch was independently evaluated by 3 annotators, yielding 300 total judgments from 30 unique evaluators. ',
          },
        },
        {
          id: '2.',
          title: 'Structure & Attribute Coverage',
          text: 'Every transcript realizes exactly **8 interview rounds** (std = 0.0). User responses in Round 1 are substantially longer than in subsequent rounds (**129.9** vs **96.8** words on average), consistent with patterns observed in real Anthropic Interviewer data where opening responses establish professional context before narrowing to topic-specific discussion.\n\nRound 1 accounts for **47.7%** of all surfaced attributes; the remaining seven rounds contribute 52.3%, distributed roughly evenly. ',
          visual: 'bar',
          attributeBreakdown: [
            { label: 'Direct mention', pct: 30.8, color: '#2563eb' },
            { label: 'Indirect (paraphrase or description)',       pct: 21.6, color: '#60a5fa' },
            { label: 'Not mentioned',  pct: 47.6, color: '#d1d5db' },
          ],
        },
        {
          id: '3.',
          title: 'Occupation Diversity',
          text: 'The 822 individuals span **183 distinct occupation categories**, of which 135 (74%) are singletons - occupied by exactly one person. The five most common categories are journalist (n=128), filmmaker (n=121), CEO/founder (n=101), professor (n=74), and actor (n=45).\n\nCoverage rate varies meaningfully across occupations. Journalists (mean 0.44) and authors (mean 0.43) exhibit higher coverage than actors (mean 0.25) or politicians (mean 0.25). Writing-oriented professions generate attributes — bylines, publication venues — that arise naturally in conversation about work.',
          visual: 'figure',
          figure: '/WebTrace/images/Occupation_Diversity.png',
          figCaption: 'Figure 2: Mean attribute coverage rate by occupation (groups with n ≥ 15). Error bars denote standard error of the mean.',
        },
      ],
    },
  },

  // ---- Results Tabs (from §5 of the paper) ----
  results: [
    {
      label: '🔴Re-id Overview',
      title: 'Re-identification Overview and Analysis',
      body: `**Web search leads to stronger re-identification.** Enabling web search raises precision by 331% for GPT-4.1-mini and 120% for GPT-5.4-mini, with recall gains of 407% and 134% respectively. The gap between models is also larger with search, indicating that web access amplifies capability differences.

Search-enabled models form two performance bands. DeepSeek-V4-Flash, GLM-4.7, Gemini-3-Flash, and GPT-5.4-mini achieve similar re-identification performance, while Llama-3.3-70B, Qwen3-32B, and GPT-4.1-mini form a lower cluster — suggesting performance is partly stratified by overall model capability.

**Precision vs. recall reflects different threat profiles.** GPT-5.4-mini leads in recall (0.517), useful for broad corpus sweeps where false positives can be filtered downstream. DeepSeek-V4-Flash achieves the highest precision (0.618), more suited to targeted attacks where incorrect identifications are costly.

**Parametric knowledge alone poses risk.** GPT-5.4-mini without search correctly re-identifies roughly one in five interviewees (precision 0.247, recall 0.221) - no retrieval needed. This suggests the model's pre-training data itself constitutes a privacy risk, enabling re-identification through reasoning over memorized biographical associations.`,
      figures: [
        { src: '/WebTrace/images/Precision_Recall.png', caption: 'Figure 3: Transcript-level precision–recall trade-off across nine model configurations.' },
      ],
    },
    {
      label: '🟠Confidence Calibration',
      title: 'Confidence Calibration',
      layout: 'stacked',
      body: `Across models, empirical precision increases monotonically with self-reported confidence, confirming that the ordinal labels are directionally meaningful. However, the **same confidence label does not imply the same precision** across models.

The confidence–precision curves mirror the aggregate performance bands. Lower-performing models (Llama-3.3-70B, Qwen3-32B, GPT-4.1-mini) only separate clearly at **very_high** confidence, while stronger models (DeepSeek-V4-Flash, GLM-4.7, GPT-5.4-mini) show a sharp precision increase already at **high** confidence. In fact, **very_high** predictions from weaker models reach only roughly the precision of **high** predictions from stronger ones.

**Gemini-3-Flash is a notable exception.** Despite strong aggregate performance, it assigns Very High confidence unusually often (n=481) with only ≈0.70 precision at that level, revealing a systematic **overconfidence pattern**.`,
      figures: [
        { src: '/WebTrace/images/confidence_report.png', caption: 'Figure 4: Confidence calibration curves. Grey dashed line and band denote ideal calibration (±0.1).' },
        { src: '/WebTrace/images/Confidence_Distribution.png', caption: 'Figure 5: Confidence level distribution and over-/under-confidence rates.' },
      ],
    },
    {
      label: '🟡Retrieval Strategies and Source Reliance',
      title: 'Retrieval Strategies and Source Reliance',
      body: `We examine the web domains appearing in search results for correctly identified transcripts, retaining the 15 most frequent domains per model.

**Tavily search:** For all four Tavily-backed models, Instagram, LinkedIn, YouTube, Facebook, Wikipedia, and Reddit occupy the top six positions in varying order — consistent with the shared search backend shaping which domains are surfaced, despite substantial F1 differences (0.17–0.50).

**Bing search:** The two GPT models show distinct domain rankings. GPT-5.4-mini is led by Wikipedia (249) and Reddit (211); GPT-4.1-mini by Forbes, Google Books, and PubMed. Instagram, YouTube, and Facebook are absent from both models' top 15.

**Google Search grounding:** Gemini-3-Flash shows Reddit dominating (91), with far fewer total domain occurrences (175) compared to Tavily models (900+), suggesting Google returns fewer source URLs but spreads them across a broader set of domains.

**Takeaway:** The three backends surface different domains yet achieve comparable F1, indicating re-identification can proceed through **different retrieval pathways**. Domain-filtering could reduce retrieval cost while preserving the most informative sources.`,
      figures: [],
    },
    {
      label: '🟢Re-identification Risk Across Occupations',
      title: 'Re-identification Risk Across Occupations',
      body: `Both recall and precision follow the same occupational gradient: **professors** have the highest mean recall (0.47) and precision (0.52), while **actors** have the lowest (0.12 and 0.17). This ordering is broadly consistent across all nine configurations, suggesting variation is driven more by occupation-level properties than by model differences.

Among candidates that models output, the fraction that is incorrect is also higher for low-recall occupations: for actors, **82% of identified candidates are false positives**, compared with 45% for professors. Actors additionally have the highest generic-only rate (0.21), meaning models fall back to non-specific descriptions more often.

One explanation is that occupations differ in how uniquely their professional attributes identify an individual. A professor's institutional affiliation and publication record may jointly narrow the search to a single person, whereas an actor's credits are shared across large casts.`,
      figures: [
        { src: '/WebTrace/images/occupation_heatmap.png', caption: 'Figure 6: Recall (left) and precision (right) by occupation category and model configuration. Rows sorted by mean recall (descending).' },
      ],
    },
    {
      label: '🔵Text-Level Anonymization',
      title: 'Text-Level Anonymization',
      body: `We evaluate two increasingly aggressive text-level defenses on a 30% subsample (247 transcripts) using Gemini-3-Flash as the attacker.

**NER-based entity removal** — masking named entities (persons, organizations, locations) — reduces F1 from 53.3% to **44.1%** (−9.2pp).

**NER + LLM paraphrasing** — rewriting the remaining content while preserving meaning — further reduces F1 to **35.1%** (−9.0pp additional).

The defenses yield monotonic reduction, yet even after both layers, **33.2% of individuals remain re-identifiable**. The core limitation is that NER targets explicit identifiers, whereas re-identification proceeds through implicit and contextual signals — combinations of professional domain, career trajectory, and domain-specific details that jointly narrow to a unique individual.`,
      figures: [],
    },
    {
      label: '🟣Prompt-Level Privacy Instructions',
      title: 'Prompt-Level Privacy Instructions',
      body: `We evaluate a privacy-constraining system prompt using GPT-5.4-mini on the same subsample, under two intent framings.

**Direct intent** — the prompt explicitly requests identification. Adding a privacy system prompt reduces F1 from 53.3% to **1.6%**. The model engages search and reasoning but ultimately declines to output a named candidate. System-level safety instructions can effectively override explicit re-identification requests.

**Indirect intent** — the objective is embedded in an ostensibly benign task (e.g., "summarize this person's background and find related publications"). With the privacy prompt applied at all three pipeline stages, F1 remains at **11.6%**, with 16 correct re-identifications in both conditions.

The fundamental challenge: each step in the indirect pipeline is individually indistinguishable from an ordinary information-retrieval task. A model has no basis to treat "what types of public records would a marine biologist have?" differently based on downstream intent.`,
      figures: [],
    },
    {
      label: '⚪Cost–Quality Trade-off',
      title: 'Cost–Quality Trade-off',
      body: `Three models sit on or near the Pareto frontier: **Gemini-3-Flash** (F1=0.522) and **DeepSeek-V4-Flash** (F1=0.505) at moderate cost, and **GPT-5.4-mini** (F1=0.530) at roughly double their cost.

The per-dimension analyses confirm the Pareto frontier is consistent whether cost is measured by token usage or processing time.

From a threat-modeling perspective, the most concerning finding is that **near-SOTA re-identification is achievable at low cost**, reducing the barrier for large-scale attacks. Open-weight models achieve performance on par with proprietary models while operating at roughly half the cost.

Claude Sonnet 4.6 was evaluated on a 50-transcript subsample due to cost (~$0.85/transcript vs. <$0.10 for most others), achieving precision 55.3%, recall 42.0% (F1=0.477) with 502.5s average latency (directional only).`,
      figures: [
        { src: '/WebTrace/images/Accuracy_Cost_Pareto.png', caption: 'Figure 7: Quality–cost Pareto analysis. Gemini-3-Flash and DeepSeek-V4-Flash match top F1 at roughly half the cost of GPT-5.4-mini.' },
      ],
    },
  ],


  // ---- BibTeX ----
  bibtex: `@misc{TBD
}`,

  // ---- Footer ----
  footer: {
    year: 2026,
    projectName: 'WebTrace',
    links: [
      { label: 'Paper', url: 'https://huggingface.co/you/model' },
      { label: 'Code', url: 'https://github.com/you/repo' },
      { label: 'Dataset', url: 'https://huggingface.co/datasets/you/data' },
    ],
  },
}

export default siteData
