export type DiseaseCategory = {
  title: string
  items: string[]
  image: string
}

export const DISEASE_CATEGORIES: DiseaseCategory[] = [
  {
    title: "ANORECTAL CARE",
    items: ["Piles (Haemorrhoid)", "Fissure", "Fistula"],
    image: "/ayurveda-anorectal-care-herbal-illustration.jpg",
  },
  {
    title: "SKIN CARE",
    items: [
      "White Patches",
      "Psoriasis",
      "Urticaria (Sheetapitta)",
      "Ring Worm",
      "Scabies (Itching)",
      "Eczema",
      "Nail Fungal Infection",
    ],
    image: "/ayurveda-skin-care-herbal-skincare-natural-remedie.jpg",
  },
  {
    title: "PAIN MANAGEMENT",
    items: ["Joint Pain", "Back Pain", "Rheumatoid Arthritis", "Osteoarthritis", "Gout", "Sciatica", "Frozen Shoulder"],
    image: "/ayurveda-pain-management-joint-pain-back-pain-reme.jpg",
  },
  {
    title: "REPRODUCTIVE CARE / SEXUAL HEALTH",
    items: [
      "Quick Discharge",
      "Night Fall",
      "Herpes",
      "Syphilis",
      "Gonorrhoea",
      "White Discharge",
      "Mense Disorder",
      "Low Sperm Count",
    ],
    image: "/ayurveda-reproductive-care-sexual-health-wellness-.jpg",
  },
  {
    title: "HAIR CARE",
    items: ["Hair Fall", "Alopecia", "Grey Hair", "Dandruff (Seborrheic Dermatitis)"],
    image: "/ayurveda-hair-care-herbal-hair-fall-dandruff.jpg",
  },
  {
    title: "GASTRIC CARE",
    items: [
      "Gastritis",
      "IBD/IBS",
      "Gastric Ulcer",
      "Peptic Ulcer",
      "Constipation (Mutrakriccha)",
      "Diarrhoea/Dysentery",
      "Fullness Of Abdomen",
      "Acidity",
    ],
    image: "/ayurveda-gastric-care-digestion-herbal-stomach-rem.jpg",
  },
  {
    title: "DIABETES CARE",
    items: ["Weight Management Care", "Diabetic Wound and Foot Care"],
    image: "/ayurveda-diabetes-care-blood-sugar-herbal.jpg",
  },
  {
    title: "KIDNEY CARE",
    items: [
      "Kidney Stone",
      "UTI",
      "AKD",
      "CKD",
      "Difficult Micturition",
      "Retention Of Urine (Mutraghata)",
      "Prostate Enlargement",
    ],
    image: "/ayurveda-kidney-care-urinary-health-herbal.jpg",
  },
  {
    title: "ENT CARE",
    items: ["Cough", "Sinusitis", "Tonsilitis", "Asthma", "Rhinitis"],
    image: "/ayurveda-ent-care-cough-sinusitis-herbal.jpg",
  },
  {
    title: "LIVER CARE",
    items: ["Fatty Liver", "Jaundice"],
    image: "/ayurveda-liver-care-detox-herbal.jpg",
  },
  {
    title: "STRESS MANAGEMENT",
    items: ["Sleep Disorder", "Memory & Brain Support", "Anxiety"],
    image: "/ayurveda-stress-management-meditation-calming-herb.jpg",
  },
  {
    title: "IMMUNITY CARE",
    items: ["Boost Immunity"],
    image: "/ayurveda-immunity-booster-herbal.jpg",
  },
  {
    title: "GENERAL DISEASE",
    items: ["Hypertension", "Hypotension", "Obesity", "Anemia", "Fever"],
    image: "/ayurveda-general-health-wellness-herbal.jpg",
  },
]
