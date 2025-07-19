import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const experiences = [
    {
      company: "Illinois Institute of Technology",
      role: "AI/ML Research Assistant",
      location: "Chicago, IL",
      period: "Jun 2025 – Present",
      description: [
        "Designed a reinforcement learning pipeline using PPO in OpenAI Gymnasium (Ant-v4) with MuJoCo physics engine and Stable-Baselines3.",
        "Integrated trained agents into a custom Unity 3D environment using socket programming and Oculus VR for immersive RL visualization."
      ]
    },
    {
      company: "Illinois Institute of Technology",
      role: "Teaching Assistant",
      location: "Chicago, IL",
      period: "Jun 2025 – Present",
      description: [
        "Mentored graduate students in data wrangling, feature engineering, dimensionality reduction, and model evaluation using Python, R, SQL, and Pandas.",
        "Reinforced data science concepts during lab sessions, project reviews, and code debugging."
      ]
    },
    {
      company: "Open Avenues Foundation",
      role: "Data Scientist – Build Fellow Consultant",
      location: "Chicago, IL",
      period: "Sep 2024 – May 2025",
      description: [
        "Built a computer vision pipeline to detect and classify highlight-worthy moments in volleyball using OpenCV and motion-based features, achieving 88% F1-score.",
        "Automated 1–2 minute highlight reel generation, reducing manual editing time by 80%."
      ]
    },
    {
      company: "Boeing India Private Limited",
      role: "Data Analyst",
      location: "Bengaluru, India",
      period: "Aug 2022 – Jul 2024",
      description: [
        "Improved booking efficiency by 30% through SQL pipelines across MySQL and MSSQL for real-time KPI dashboards.",
        "Saved $60K+ annually by reducing reporting latency by 98% using stored procedures and indexing.",
        "Built standardized SQL templates and automated 500+ data validation checks with Python to ensure compliance."
      ]
    },
    {
      company: "Exposys Data Labs",
      role: "Data Analyst Intern",
      location: "Remote, India",
      period: "Jul 2019 – Sep 2019",
      description: [
        "Built a Python-based ETL pipeline using Pandas and MySQL to clean and normalize 25K+ records.",
        "Reduced manual preparation by 60% and enabled faster feature extraction for ML."
      ]
    }
]

export function Experience() {
  return (
    <section id="experience" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">The Journey So Far</h2>
          <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">A track record of turning data-driven insights into measurable results.</p>
        </div>
        <div className="relative mt-12 grid gap-8 before:absolute before:inset-0 before:left-8 before:w-px before:bg-border md:before:left-1/2 md:before:-translate-x-1/2">
          {experiences.map((exp, index) => (
            <div key={index} className="relative md:grid md:grid-cols-2 md:gap-8">
              <div className={`flex items-center justify-start md:justify-end ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative w-full">
                  <Card className="shadow-lg transition-transform-shadow duration-300 hover:shadow-glow-primary hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{exp.role}</CardTitle>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                      <CardDescription>{`${exp.company} - ${exp.location}`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                            <span className="text-sm text-foreground/80">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <div className="absolute left-8 top-8 -z-10 h-4 w-4 rounded-full bg-primary shadow-glow-primary md:left-auto md:right-[-2.05rem]"></div>
                </div>
              </div>
              <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
