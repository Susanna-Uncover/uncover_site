import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import countQuery from "@/assets/portfolio/seattle/count-query.png";
import sunriseSunset from "@/assets/portfolio/seattle/sunrise-sunset.png";
import collisionsPerYear from "@/assets/portfolio/seattle/collisions-per-year.png";
import collisionsPerMonth from "@/assets/portfolio/seattle/collisions-per-month.png";
import injuriesFatalities from "@/assets/portfolio/seattle/injuries-fatalities.png";
import factorsPercentages from "@/assets/portfolio/seattle/factors-percentages.png";
import dashboard1 from "@/assets/portfolio/seattle/dashboard-1.jpg";
import dashboard2 from "@/assets/portfolio/seattle/dashboard-2.jpg";
import factorsSeverity from "@/assets/portfolio/seattle/factors-severity.jpg";

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-secondary/60 border border-border rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono text-foreground/90 my-6">
    <code>{children}</code>
  </pre>
);

const Screenshot = ({ src, alt }: { src: string; alt: string }) => (
  <div className="my-8">
    <img
      src={src}
      alt={alt}
      className="w-full max-w-3xl mx-auto rounded-xl border border-border"
    />
  </div>
);

const SmallScreenshot = ({ src, alt }: { src: string; alt: string }) => (
  <div className="my-8">
    <img
      src={src}
      alt={alt}
      className="w-full max-w-[24rem] mx-auto rounded-xl border border-border"
    />
  </div>
);

const SeattleCollisions = () => (
  <Layout>
    <section className="section-padding pt-28 min-h-[70vh]">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/portfolio">
            <ArrowLeft size={16} className="mr-2" />
            Back to Portfolio
          </Link>
        </Button>

        {/* Title */}
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Portfolio</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Exploring and Visualising the Seattle Collision Data
        </h1>
        <p className="text-primary text-sm font-medium mb-8">SQL, Tableau</p>

        {/* Introduction */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To reduce the number of collisions in the city, the Seattle Department of Transportation has decided to embark on a project exploring the historical data it has collected from 2005 to 2019.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To make the insights travel further, they have also commissioned the creation of a dashboard, visualising the data in line with their key objectives.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The full code is available on{" "}
          <a href="https://github.com/Susanna-Uncover/SQL-projects/blob/13da97402cc9d9bd929e2be94bce6f2329024a80/2%20SQL%20Seattle%20Collision%20Exploration%20Project.sql" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            GitHub
          </a>. You can also view the full Tableau dashboard{" "}
          <a href="https://public.tableau.com/app/profile/susanna.tatevosyan/viz/SeattleCollisionsCircumstancesandCauses/SeattleCollisionsCircumstancesandCauses" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            here
          </a>.
        </p>

        {/* Pre-requisites */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Pre-requisites</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>SQL Server</li>
          <li>Seattle collisions <a href="https://www.kaggle.com/datasets/mcfly1/vehicle-collision-data-in-seattle-2005-2019" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Kaggle dataset</a></li>
          <li>Tableau Public</li>
        </ul>

        {/* Project objectives */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Project Objectives</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I have been asked to perform exploratory data analysis and visualisation to identify:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>When were collisions most likely to happen in Seattle between 2005 and 2019?</li>
          <li>What types of collisions result in the highest rates of severe injuries or fatalities among the public in Seattle?</li>
          <li>Which environmental, behavioral, and infrastructure factors have the greatest impact on collision likelihood in Seattle?</li>
        </ul>

        {/* Why Tableau */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Why Tableau?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Tableau is a powerful data visualisation tool that allows users to create interactive and shareable dashboards and reports from various data sources.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          It helps users analyse, visualise, and understand data through interactive and dynamic visualisations, making it easier to uncover insights and trends.
        </p>

        {/* Data Exploration */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Data Exploration</h2>

        {/* 1. Initial data cleaning */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">1. Initial Data Cleaning</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To start with, I reviewed the total number of records in the table to see how much data I have available using the COUNT(*) command (a total of 111,882 records).
        </p>

        <CodeBlock>{`-- Identifying the total number of collisions
SELECT count(*)
FROM PortfolioProject.dbo.SeattleCollision`}</CodeBlock>

        <SmallScreenshot src={countQuery} alt="Count query result" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Date and time formatting of this dataset is somewhat flawed. The date column can be fixed quite easily by converting it into a DATE format in SQL, however, the time column float contains values that represent time in fractional hours (e.g., 13.6833333333333).
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The conversion is done by multiplying the float value by 60 to get the total number of minutes, then add this to a base time of '00:00:00'. The values are usable but hard to read and may not convert well in Tableau, hence I have converted them into a simpler format.
        </p>

        <CodeBlock>{`-- Converting the values from the 'time' column into readable time formats
ALTER TABLE PortfolioProject.dbo.SeattleCollision
ADD N_TIME TIME;

UPDATE PortfolioProject.dbo.SeattleCollision
SET N_TIME = CAST(DATEADD(MINUTE, TIME * 60, '00:00') AS TIME);

ALTER TABLE PortfolioProject.dbo.SeattleCollision
ADD TIME_UPD NVARCHAR(255);

UPDATE PortfolioProject.dbo.SeattleCollision
SET TIME_UPD = CONVERT(NVARCHAR(255), N_TIME, 108);`}</CodeBlock>

        {/* 2. Creating additional fields */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">2. Creating Additional Fields</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The dataset includes some informative columns that can give an overview of the driving conditions during collisions, such as ROADCOND (Wet, Ice, Dry etc.) and WEATHER (Overcast, Clear, Raining etc.). I have created a column based on the values in these two columns, indicating whether the driving conditions were good.
        </p>

        <CodeBlock>{`-- Creating a filter for good vs poor driving conditions
ALTER TABLE PortfolioProject.dbo.SeattleCollision
ADD POORDRIVINGCOND bit;

UPDATE PortfolioProject.dbo.SeattleCollision
SET POORDRIVINGCOND = CASE
    WHEN WEATHER = 'Clear' AND ROADCOND = 'Dry' THEN 0
    ELSE 1
END;`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Daylight (whether the visibility was good or not) may be a contributing factor in collisions. The LIGHTCOND column contains values from 0–3, but their meaning is unclear as they don't correlate with collision times. I have created a column for the daylight based on the time, however, I have to account for the differences in sunrise and sunset times depending on the time of year as well as summer and winter time.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Luckily, all of the data was gathered within the same area, so I have created a table capturing the sunrise and sunset times on the 15th of every month to account for seasonal variation and daylight saving time.
        </p>

        <SmallScreenshot src={sunriseSunset} alt="Sunrise and sunset times table" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Then, I have created a function, FINDTIMEOFDAY, which determines whether a collision occurred during daylight or nighttime based on the collision date and time from the SeattleSunriseSunset table. The results are then saved in a column called TIMEOFDAY.
        </p>

        <CodeBlock>{`-- Creating a function for determining Daylight vs Nighttime
CREATE FUNCTION FINDTIMEOFDAY(
    @CollisionDate DATE,
    @CollisionTime TIME)
RETURNS VARCHAR(8)
AS
BEGIN
    DECLARE @MONTHN INT;
    DECLARE @SUNRISE TIME;
    DECLARE @SUNSET TIME;
    SELECT @MONTHN = MONTH(@CollisionDate);
    SELECT @SUNRISE = SUNRISE, @SUNSET = SUNSET
    FROM PortfolioProject.dbo.SeattleSunriseSunset
    WHERE MONTHN = @MONTHN;
    RETURN CASE
        WHEN @CollisionTime >= @SUNRISE AND @CollisionTime < @SUNSET THEN
            'Daylight'
        ELSE 'Night'
    END;
END;`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Similarly to the driving condition filter, I have created a way of determining whether the collision occurred during nighttime.
        </p>

        <CodeBlock>{`-- Creating a filter for Nighttime
ALTER TABLE PortfolioProject.dbo.SeattleCollision
ADD NIGHTTIME bit;

UPDATE PortfolioProject.dbo.SeattleCollision
SET NIGHTTIME = CASE
    WHEN TIMEOFDAY = 'Daylight' THEN 0
    ELSE 1
END;`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Lastly, the SeverityCode column contains values from 0-3. While it is potentially useful, it isn't descriptive currently. Having located the original metadata for the data frame, I set up a column with more descriptive labels.
        </p>

        <CodeBlock>{`-- Adding more descriptive labels to the Severity column
ALTER TABLE PortfolioProject.dbo.SeattleCollision
ADD SEVERITY nvarchar(255);

UPDATE PortfolioProject.dbo.SeattleCollision
SET SEVERITY = CASE
    WHEN SEVERITYCODE = 3 THEN '3—fatality'
    WHEN SEVERITYCODE = 2 THEN '2—injury'
    WHEN SEVERITYCODE = 1 THEN '1—property damage'
    ELSE '0—unknown'
END;`}</CodeBlock>

        {/* 3. Examining the data */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">3. Examining the Data in More Detail</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          First, I calculated the number of collisions per year compared to the number of people affected. Using this query, I have determined that 2014 was the worst year for collisions, with the highest number of people affected.
        </p>

        <CodeBlock>{`-- Calculating the number of collisions per year and n of people affected
SELECT
    YEAR(DATE_UPD) AS COLLISION_YEAR,
    COUNT(*) AS COLLISIONS_PER_YEAR,
    SUM(PERSONCOUNT) AS TOTAL_AFFECTED
FROM PortfolioProject.dbo.SeattleCollision
GROUP BY YEAR(DATE_UPD)
ORDER BY COLLISIONS_PER_YEAR DESC;`}</CodeBlock>

        <SmallScreenshot src={collisionsPerYear} alt="Collisions per year results" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Using a similar method, I have determined that October, June and July are the months when the highest number of collisions happen.
        </p>

        <SmallScreenshot src={collisionsPerMonth} alt="Collisions per month results" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Next, I have reviewed the number of collisions that resulted in injuries vs fatalities:
        </p>

        <CodeBlock>{`SELECT
    COUNT(*) AS TOTAL_COLLISIONS,
    SUM(CASE WHEN FATALITIES > 0 THEN 1 ELSE 0 END) AS TOTAL_FATAL_COLLISIONS,
    (SUM(CASE WHEN FATALITIES > 0 THEN 1.0 ELSE 0 END) / COUNT(*)) * 100.0 AS PERCENTAGE_FATAL_COLLISIONS,
    SUM(CASE WHEN INJURIES > 0 THEN 1 ELSE 0 END) AS TOTAL_INJURIES,
    (SUM(CASE WHEN INJURIES > 0 THEN 1.0 ELSE 0 END) / COUNT(*)) * 100.0 AS PERCENTAGE_INJURIES
FROM
    PortfolioProject.dbo.SeattleCollision;`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The number of collisions that resulted in fatalities is relatively low (0.16%) compared to injuries which constitute 35.55% of all collisions.
        </p>

        <Screenshot src={injuriesFatalities} alt="Injuries vs fatalities results" />

        {/* 4. Analysing factors */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">4. Analysing the Factors Present During Collisions</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Using this code, I have ascertained what factors are more or less prevalent during collisions. This code computes the percentage of collisions attributed to various factors, such as inattention, driving under the influence, speeding, hitting parked cars, poor driving conditions, nighttime incidents, and intersection-related collisions.
        </p>

        <CodeBlock>{`SELECT
    COUNT(*) AS TOTAL_COLLISIONS,
    (SUM(CASE WHEN INATTENTIONIND = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PERC_INATTENTIONIND,
    (SUM(CASE WHEN UNDERINFL = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PERC_UNDERINFL,
    (SUM(CASE WHEN SPEEDING = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PERC_SPEEDING,
    (SUM(CASE WHEN HITPARKEDCAR = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PERC_HITPARKEDCAR,
    (SUM(CASE WHEN POORDRIVINGCOND = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PERC_POORDRIVINGCOND,
    (SUM(CASE WHEN NIGHTTIME = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PERC_NIGHTTIME,
    (SUM(CASE WHEN intersection_related = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PERC_INTERSECT_RELATED
FROM PortfolioProject.dbo.SeattleCollision;`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          It's evident from the data that poor driving conditions and intersection-related circumstances are significant factors contributing to collisions, with poor driving conditions accounting for 37% and intersection-related circumstances for 39% of all collisions.
        </p>

        <Screenshot src={factorsPercentages} alt="Factor percentages for collisions" />

        <p className="text-muted-foreground leading-relaxed mb-6">
          With these steps completed, I moved on to create the visualisations.
        </p>

        {/* Data Visualisation */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Data Visualisation</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I've developed a Tableau Public dashboard addressing the stakeholders' three primary objectives. The interactive charts allow filtering by collision severity and year for deeper insights.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The analysis reveals that 2014 recorded the highest number of collisions, while 2008 and 2009 had the lowest. Collisions exhibit seasonal patterns, peaking in October, June, and July, and dipping in February.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Moreover, collisions are more frequent between 12 PM to 5 PM, with the lowest occurrences around 4 AM. Collisions that resulted in fatalities are also quite frequent around 9 PM.
        </p>

        <Screenshot src={dashboard1} alt="Tableau dashboard - collision timing analysis" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Mid-block junctions tend to see the highest number of collisions, closely followed by intersections. Most collisions involve vehicle angles, rear-end impacts, and parked cars.
        </p>

        <Screenshot src={dashboard2} alt="Tableau dashboard - collision types and factors" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Intersections and poor driving conditions emerge as common elements across all collision types, with nighttime also playing a significant role.
        </p>

        <Screenshot src={factorsSeverity} alt="Factors by collision severity" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Regarding collisions leading to injuries or fatalities, the data underscores that intersections are the primary hotspots, a trend supported by the Q3 chart.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          These collisions frequently involve pedestrians, cyclists, and various vehicle angles.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Notably, speeding, driving under the influence, and nighttime conditions are significantly more prevalent in collisions resulting in fatalities.
        </p>

        {/* Key Takeaways */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Key Takeaways</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-3 mb-12">
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Timing matters.</span>{" "}
            Collisions peak between 12–5 PM and during October, June, and July, suggesting targeted enforcement or awareness campaigns during these periods could be effective.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Intersections are the primary hotspot.</span>{" "}
            Nearly 40% of collisions occur at or near intersections, making them a priority for infrastructure improvements.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Behavioral factors escalate severity.</span>{" "}
            While speeding and driving under the influence account for a small percentage of total collisions, they are significantly overrepresented in fatalities.
          </li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default SeattleCollisions;
