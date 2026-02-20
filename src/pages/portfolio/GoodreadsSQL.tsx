import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import dataPreview from "@/assets/portfolio/goodreads/data-preview.jpg";
import nullValues from "@/assets/portfolio/goodreads/null-values.png";
import authorUrls from "@/assets/portfolio/goodreads/author-urls.png";
import authorUrls2 from "@/assets/portfolio/goodreads/author-urls-2.png";
import topRated from "@/assets/portfolio/goodreads/top-rated.png";
import sciFiltered from "@/assets/portfolio/goodreads/sci-fi-filtered.png";
import brandonSanderson from "@/assets/portfolio/goodreads/brandon-sanderson.png";

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

const GoodreadsSQL = () => (
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
          Cleaning Goodreads Data for Top Sci-Fi Recommendations
        </h1>

        {/* Introduction */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I love reading, and sci-fi has always been my genre of choice. Having read many sci-fi classics, I am always searching for any gems I might have missed.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I wanted to take a data-driven approach to answer a simple question:
        </p>
        <p className="text-foreground font-medium italic mb-4">
          Which sci-fi books are highly rated by a large number of readers and worth adding to my reading list?
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To answer this, I used a web-scraped Goodreads dataset from Kaggle containing book ratings, reviews, and genre information. However, like most real-world data, it arrived messy and unusable in its raw form — a common obstacle in any analytics workflow.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The full code is available on{" "}
          <a href="https://github.com/Susanna-Uncover/SQL-projects/blob/13da97402cc9d9bd929e2be94bce6f2329024a80/1%20SQL%20Goodreads%20Data%20Cleaning%20Project.sql" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            GitHub
          </a>.
        </p>

        {/* Pre-requisites */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Pre-requisites</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>SQL Server</li>
          <li>Goodreads <a href="https://www.kaggle.com/datasets/chiragmohnani/book-sample-dataset-cleaning-goodreads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Kaggle dataset</a></li>
        </ul>

        {/* Why SQL */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Why SQL?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For structured tabular data, SQL is hard to beat. It allowed me to clean and transform this dataset efficiently without leaving the database environment, keeping the workflow simple and scalable.
        </p>

        {/* Let's review the data */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Let's Review the Data</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          At a glance, several issues stand out:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>No column names or unique IDs</li>
          <li>Missing values, especially in the ISBN column, make them unsuitable as unique identifiers</li>
          <li>Duplicate rows and some unusable rows where most of the data is missing</li>
          <li>No author names</li>
          <li>The 'genres' column contains valuable data, but is messy and challenging to use</li>
        </ul>

        <Screenshot src={dataPreview} alt="Raw Goodreads data preview" />

        {/* Data Cleaning */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Data Cleaning</h2>

        {/* 1. Adding column names */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">1. Adding Column Names and Unique IDs</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The ID numbers can be added simply with the help of the <code className="text-primary bg-secondary/60 px-1.5 py-0.5 rounded text-sm">IDENTITY(1,1)</code> attribute. It specifies that the values in this column should start at 1 and increment by 1 for each new row, ensuring each row gets a unique identifier.
        </p>

        <CodeBlock>{`-- Adding an ID column to improve table navigation
ALTER TABLE PortfolioProject.dbo.Goodreads
ADD id INT IDENTITY(1,1);`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Since the data in the first row is initially read as column names, it needs to be saved as a new row before the column is renamed.
        </p>

        <CodeBlock>{`-- Duplicating the first row of data before renaming the columns
INSERT INTO PortfolioProject.dbo.Goodreads
VALUES (
	4.4
	, 136455
	, '0439023483'
	, 'good_reads:book'
	, 'https://www.goodreads.com/author/show/153394.Suzanne_Collins'
	, 2008
	, '/genres/young-adult|/genres/science-fiction|/genres/dystopia|/genres/fantasy|/genres/science-fiction|/genres/romance|/genres/adventure|/genres/book-club|/genres/young-adult|/genres/teen|/genres/apocalyptic|/genres/post-apocalyptic|/genres/action'
	, 'dir01/2767052-the-hunger-games.html'
	, 2958974
	, 'The Hunger Games (The Hunger Games, #1)'
	)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Next, I renamed the columns as such:
        </p>

        <CodeBlock>{`-- Renaming the columns 
EXEC sp_rename 'Goodreads.4#4', 'rating';
EXEC sp_rename 'Goodreads.136455', 'numberofreviews';
EXEC sp_rename 'Goodreads.0439023483', 'isbn';
EXEC sp_rename 'Goodreads.good_reads:book', 'media_type';
EXEC sp_rename 'Goodreads.https://www#goodreads#com/author/show/153394#Suzanne_Collins', 'author_url';
EXEC sp_rename 'Goodreads.2008', 'publishing_year';
EXEC sp_rename 'Goodreads./genres/young-adult|/genres/science-fiction|/genres/dystopia|/ge', 'genres';
EXEC sp_rename 'Goodreads.dir01/2767052-the-hunger-games#html', 'directory';
EXEC sp_rename 'Goodreads.2958974', 'rating_count';
EXEC sp_rename 'Goodreads.The Hunger Games (The Hunger Games, #1)', 'title';`}</CodeBlock>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">2. Handling Missing Values</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The initial overview shows that the number of NULL values is underreported since some missing values are marked as 'None' in the dataset. Moreover, the dataset also includes two entries that are missing most of the important information.
        </p>

        <CodeBlock>{`-- Examining the table for null values
SELECT COUNT(*)-COUNT(rating) AS rating
     , COUNT(*)-COUNT(numberofreviews) AS n_of_reviews
     , COUNT(*)-COUNT(isbn) AS isbn
     , COUNT(*)-COUNT(publishing_year) AS publishing_year
     , COUNT(*)-COUNT(genres) AS genres
     , COUNT(*)-COUNT(rating_count) AS rating_count
     , COUNT(*)-COUNT(title) AS title
FROM PortfolioProject.dbo.Goodreads;`}</CodeBlock>

        <Screenshot src={nullValues} alt="Null values examination" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          To address this, I renamed all 'None' values as NULL to make filtering easier and removed the two rows where most of the information is missing.
        </p>

        <CodeBlock>{`-- Updating the missing values to read as NULL
UPDATE PortfolioProject.dbo.Goodreads SET isbn = NULL WHERE isbn = 'None';
UPDATE PortfolioProject.dbo.Goodreads SET media_type = NULL WHERE media_type = 'None';
UPDATE PortfolioProject.dbo.Goodreads SET author_url = NULL WHERE author_url = 'None';
UPDATE PortfolioProject.dbo.Goodreads SET title = NULL WHERE title = 'None';
UPDATE PortfolioProject.dbo.Goodreads SET genres = NULL WHERE genres = 'None';

-- Clearing the rows where most of the data is missing
DELETE FROM PortfolioProject.dbo.Goodreads WHERE media_type IS NULL;`}</CodeBlock>

        {/* 3. Standardising ratings */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">3. Standardising the Ratings Column</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I also standardised the rating column by converting it from a 5-point scale to a 100-point scale:
        </p>

        <CodeBlock>{`ALTER TABLE PortfolioProject.dbo.Goodreads
ADD rating_100 FLOAT;

UPDATE PortfolioProject.dbo.Goodreads
SET rating_100 = rating * 20;`}</CodeBlock>

        {/* 4. Removing duplicates */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">4. Removing Duplicates</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          First, I looked at counts of duplicate values based on the ISBNs of the books. ISBN is a unique identifier assigned to books and related products (such as e-books) to facilitate their identification, so it can prove to be useful for identifying duplicates.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          With the help of this code, I have identified 3 duplicate entries with identical information:
        </p>

        <CodeBlock>{`-- Identifying duplicate values
SELECT isbn, COUNT(*)
FROM PortfolioProject.dbo.Goodreads
GROUP BY isbn
HAVING COUNT(*) > 1;

SELECT *
FROM PortfolioProject.dbo.Goodreads
WHERE isbn = '0439023483';`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Using the 'id' column that I have created earlier, I have removed the duplicate rows as such:
        </p>

        <CodeBlock>{`-- Removing duplicate rows
DELETE FROM PortfolioProject.dbo.Goodreads
WHERE isbn = '0439023483'
AND id <> (SELECT MIN(id)
           FROM PortfolioProject.dbo.Goodreads
           WHERE isbn = '0439023483');`}</CodeBlock>

        {/* 5. Adding author names */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">5. Adding the Names of Authors</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Luckily, the information in the 'author_url' column can be used to derive the names of the authors:
        </p>

        <Screenshot src={authorUrls} alt="Author URLs in the dataset" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          I created a new column called 'author' and populated it by parsing the 'author_url' column using the last part of its value. Lastly, I replaced the underscore with a space for better readability.
        </p>

        <CodeBlock>{`-- Splitting out the author's column based on the author_url column
ALTER TABLE PortfolioProject.dbo.Goodreads
ADD author NVARCHAR(255);

UPDATE PortfolioProject.dbo.Goodreads
SET author = REPLACE(
  PARSENAME(REPLACE(author_url, ',', '.'), 1),
  '_', ' '
);`}</CodeBlock>

        {/* 6. Genre filters */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">6. Creating Filters for Popular Genres</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          From a rough overview of the initial tables, the genres column includes a lot of valuable data; however, it is loaded with information and is hard to read:
        </p>

        <Screenshot src={authorUrls2} alt="Raw genres column data" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          First, I have removed some unnecessary mentions of '/genres/', punctuation, and added more space between the tags to make it more readable.
        </p>

        <CodeBlock>{`-- Cleaning up the Genres column
UPDATE PortfolioProject.dbo.Goodreads
SET genres = REPLACE(REPLACE(REPLACE(genres, '/genres/', ''), '-', ' '), '|', ' | ');`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          I have split the more popular genres into yes/no columns for better usability and filtering. To start with, I have checked the most mentioned tags in the genres column by applying string split and counting the top 100 most popular entries:
        </p>

        <CodeBlock>{`-- Exploring the most popular tags in the genres column
SELECT TOP 100
	value [word],
	COUNT(*) [#times]
FROM  PortfolioProject.dbo.Goodreads
CROSS APPLY STRING_SPLIT(Goodreads.genres, '|') 
GROUP BY value
ORDER BY COUNT(*) DESC`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Looking at the list below, I have identified 9 key genres that I have created filters for. Naturally, this list can be extended, but for simplicity, I have narrowed it down to the most mentioned ones, such as fantasy, romance, young adult, paranormal, classics, science fiction, mystery, children, and adventure.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Firstly, I created the columns as such:
        </p>

        <CodeBlock>{`-- Creating filter columns based on the genre hits
ALTER TABLE PortfolioProject.dbo.Goodreads
ADD genre_fantasy NVARCHAR(255),
    genre_romance NVARCHAR(255),
    genre_young_adult NVARCHAR(255),
    genre_paranormal NVARCHAR(255),
    genre_classics NVARCHAR(255),
    genre_science_fiction NVARCHAR(255),
    genre_mystery NVARCHAR(255),
    genre_childrens NVARCHAR(255),
    genre_adventure NVARCHAR(255);`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Once the columns are all set, I have populated them with 'Yes/No' values based on the information provided in the 'genres' column:
        </p>

        <CodeBlock>{`UPDATE PortfolioProject.dbo.Goodreads
SET genre_fantasy = CASE WHEN genres LIKE '%fantasy%' THEN 'Yes' ELSE 'No' END,
    genre_romance = CASE WHEN genres LIKE '%romance%' THEN 'Yes' ELSE 'No' END,
    genre_young_adult = CASE WHEN genres LIKE '%young adult%' THEN 'Yes' ELSE 'No' END,
    genre_paranormal = CASE WHEN genres LIKE '%paranormal%' THEN 'Yes' ELSE 'No' END,
    genre_classics = CASE WHEN genres LIKE '%classics%' THEN 'Yes' ELSE 'No' END,
    genre_science_fiction = CASE WHEN genres LIKE '%science fiction%' THEN 'Yes' ELSE 'No' END,
    genre_mystery = CASE WHEN genres LIKE '%mystery%' THEN 'Yes' ELSE 'No' END,
    genre_childrens = CASE WHEN genres LIKE '%childrens%' THEN 'Yes' ELSE 'No' END,
    genre_adventure = CASE WHEN genres LIKE '%adventure%' THEN 'Yes' ELSE 'No' END;`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Lastly, I have dropped the unused columns, such as 'media_type', which are not informative since they contain the same value across all rows.
        </p>

        <CodeBlock>{`-- Delete unused columns
ALTER TABLE PortfolioProject.dbo.Goodreads
DROP COLUMN media_type, author_url, directory`}</CodeBlock>

        {/* Using the data */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Using the Data</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I ordered the columns more logically and looked at the top-rated books on Goodreads.
        </p>

        <Screenshot src={topRated} alt="Top rated books on Goodreads" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Interestingly, the highest-rated books on this list seem to have a relatively small number of ratings and reviews. Missing ISBN also seems to be a marker of more obscure entries with more missing data.
        </p>

        <CodeBlock>{`-- Ordering the columns, filtering out low rating counts, missing isbn rows, and non-sci-fi books
SELECT id, isbn, rating_100, rating_count, numberofreviews,
       title, author, publishing_year, genre_science_fiction
FROM PortfolioProject.dbo.Goodreads
WHERE genre_science_fiction = 'Yes'
  AND rating_count > 30
  AND isbn IS NOT NULL
ORDER BY rating DESC;`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          To get a more accurate read on the books readers particularly liked, I filtered out the rows with missing ISBNs and titles with a rating_count below 30, where the ratings become more representative. Lastly, I narrowed down on the science fiction genre using the filter column:
        </p>

        <Screenshot src={sciFiltered} alt="Filtered sci-fi results" />

        {/* The result */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">The Result</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Among the more well-known authors, Brandon Sanderson came up on top as the most well-rated author with his book 'Words of Radiance'. Coincidentally, I haven't had a chance to read much of his work before.
        </p>

        <Screenshot src={brandonSanderson} alt="Top rated Brandon Sanderson books" />

        {/* Conclusion */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Conclusion</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Through this data cleaning process, I transformed a messy, web-scraped dataset into a structured table suitable for analysis.
        </p>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Key Takeaways</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-3 mb-12">
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Data quality issues compound.</span>{" "}
            Missing ISBNs correlated with missing titles, authors, and other fields; addressing one issue often revealed others.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Feature engineering enables analysis.</span>{" "}
            The raw genres field was nearly unusable; however, converting it to binary flags simplified filtering.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Filtering criteria matter.</span>{" "}
            Setting a minimum threshold of 30 ratings filtered out obscure entries where averages are unreliable, surfacing books with more representative scores.
          </li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default GoodreadsSQL;
