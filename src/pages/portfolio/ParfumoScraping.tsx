import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import scrapingOutput1 from "@/assets/portfolio/parfumo/scraping-output-1.png";
import scrapingOutput2 from "@/assets/portfolio/parfumo/scraping-output-2.png";
import dataFrame from "@/assets/portfolio/parfumo/data-frame.png";
import fragrancePyramid from "@/assets/portfolio/parfumo/fragrance-pyramid.jpg";
import ingredientCounts from "@/assets/portfolio/parfumo/ingredient-counts.png";
import topNotesChart from "@/assets/portfolio/parfumo/top-notes-chart.png";
import heartNotesChart from "@/assets/portfolio/parfumo/heart-notes-chart.jpg";
import topNotesBar from "@/assets/portfolio/parfumo/top-notes-bar.jpg";
import baseNotesChart from "@/assets/portfolio/parfumo/base-notes-chart.jpg";
import scrapingOutput from "@/assets/portfolio/parfumo/scraping-output.png";

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
      className="w-1/2 max-w-sm mx-auto rounded-xl border border-border"
    />
  </div>
);

const ParfumoScraping = () => (
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
          BeautifulSoup for Web Scraping to Analyse Perfume Trends
        </h1>

        {/* Introduction */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Since the pandemic began, there's been a lot of talk in the perfume community about vanilla scents, with brands like Kayali getting attention for their fragrances.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Some reviewers have noticed an increase in vanilla perfume releases lately. In this project, I have used web scraping techniques with Beautiful Soup to measure just how significant this increase is.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The full code is available on <a href="https://github.com/Susanna-Uncover/Python-Data-Analytics-Projects/blob/21fa8f4f82319fa09ba3d1ade79c8244107ad01c/3%20Python%20Parfumo%20-%20Web%20Scraping.ipynb" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">GitHub</a>.
        </p>

        {/* Pre-requisites */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Pre-requisites</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>Jupyter Notebook</li>
          <li>Beautiful Soup</li>
          <li>Access to Parfumo</li>
        </ul>

        {/* Objectives */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Project objectives</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Collecting data on the recent perfume releases that have been coming out in the last few years to find out:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>What are the top ingredients that are being used in recent perfume releases?</li>
          <li>How prevalent are vanilla scents specifically in recent releases?</li>
        </ul>

        {/* What is Web Scraping */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">What is Web Scraping?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Web scraping involves using automated tools to extract data from websites, streamlining the process of gathering information for analysis. It allows for the conversion of unstructured web content into structured data.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          However, following ethical standards and compliance with website terms of service is imperative to ensure the responsible and lawful use of this technique, safeguarding both the integrity of the data and the privacy rights of individuals.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          I've only chosen to scrape a small portion of the Parfumo website to avoid overloading it and to respect the uniqueness of its content.
        </p>

        {/* Web Scraping */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Web Scraping</h2>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">1. Individual page scraping set-up</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          First, I have explored the HTML code of an individual perfume web page and write up the code to pick up the details I want to collect from it. This stage requires quite a bit of trial and error. I have collected each element separately first, to test their effectiveness.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I have then defined a function for collecting these elements since the code needs to run on several pages. I have also added a command to skip any fields that could not be gathered since Parfumo data can be patchy, especially for new releases.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">Here is the shortened version of the code, but the full code can be found on GitHub:</p>

        <CodeBlock>{`# Defining a function for scraping the web page

def scrape_perfume_data(url):
    headers = {
        "User-Agent": "Insert User Agent"
    }
    page = requests.get(url, headers=headers)
    page.raise_for_status()
    soup = BeautifulSoup(page.content, 'html.parser')

    perfume_name = brand_name = scraping_date = None

    try:
        perfume_name = soup.find('h1', class_='p_name_h1',
        itemprop='name').get_text().strip().split('\\n')[0].strip()
    except AttributeError:
        pass

    try:
        brand_span = soup.find('span', itemprop='brand')
        brand_name = brand_span.find('span', itemprop='name').get_text().strip()
    except AttributeError:
        pass

    scraping_date = datetime.date.today()

    return {
        'PerfumeName': perfume_name,
        'Brand': brand_name,
        'ScrapingDate': scraping_date
    }`}</CodeBlock>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">2. Collecting URLs of new perfume releases</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Luckily, Parfumo has a special section listing the 1000 most recent additions to their website which tend to be the most recent perfume releases spread over 50 pages.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I have defined a function for scraping the perfume links from these pages by loading the main page as 'soup3'. Then collect the links to individual perfumes listed on the page and return these links as a list.
        </p>

        <CodeBlock>{`# Defining a function for collecting the urls we want to scrape

def scrape_perfume_links(url):
    headers = {
        "User-Agent": "Insert User Agent",
        "Referer": "https://www.parfumo.com/",
        "Accept-Language": "en-US,en;q=0.9"
    }
    session = requests.Session()
    page = session.get(url, headers=headers)
    page.raise_for_status()
    soup3 = BeautifulSoup(page.content, 'html.parser')

    perfumes = soup3.find_all('div', class_='name')
    perfume_links = []
    for perfume in perfumes:
        link = perfume.find('a')['href']
        perfume_links.append(link)

    return perfume_links`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          I have defined a function that applies the 'scrape_perfume_links' function across all 50 pages. The function adds links to a list of all links collected so far. If an error occurs during scraping, it prints an error message. Finally, it returns the accumulated list of links.
        </p>

        <CodeBlock>{`# This function should parse through every page within the new release directory (theres a total of 50 of them)

def scrape_all_pages(base_url, total_pages):
    all_links = []
    base_url = 'https://www.parfumo.com/Recently_added?current_page='
    end_url = '&#x26;'
    total_pages = 50

    for page_number in range(1, total_pages + 1):
        page_url = f"{base_url}{page_number}{end_url}"
        try:
            links_on_page = scrape_perfume_links(page_url)
            all_links.extend(links_on_page)
            print(f"Scraped links from page {page_number}")
        except requests.HTTPError as e:
            print(f"Error scraping page {page_number}: {e}")
        time.sleep(1)
    return all_links`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">With this in place, I collected all the links and save them as 'perfume_links' as such:</p>

        <CodeBlock>{`# Collecting the urls we want to scrape

perfume_links = scrape_all_pages('https://www.parfumo.com/Recently_added?current_page=',
50)

print(perfume_links)`}</CodeBlock>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">3. Scraping and saving the data</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This code loops through the list of perfume links, attempting to scrape data for each link. It prints the link being scraped, tries to extract perfume data using the 'scrape_perfume_data' function, and appends the collected data to a list. If an error occurs during scraping, it prints an error message.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">So far, the process is looking promising:</p>

        <CodeBlock>{`# Collecting the data from URLs we have gathered

all_perfume_data = []

for link in perfume_links:
    print('Scraping link:', link)
    try:
        perfume_data_new = scrape_perfume_data(link)
        all_perfume_data.append(perfume_data_new)
        print(f'Data scraped successfully for {perfume_data_new["PerfumeName"]}')
    except Exception as e:
        print(f'Error scraping data for {link}: {e}')`}</CodeBlock>

        <Screenshot src={scrapingOutput} alt="Scraping output showing successful data collection" />

        <CodeBlock>{`# Saving the data to the CSV file

with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for data in all_perfume_data:
        writer.writerow(data)

print("Data saved to:", csv_file)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          To make data handling easier, I have uploaded the CSV file to the Jupyter Notebook sheet as a data frame, dropped redundant columns (since I was mainly interested in the perfume notes), and cleared the NULL values, leaving me with 509 rows to work with.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">And here is the final data frame that I have scraped:</p>

        <Screenshot src={dataFrame} alt="Final scraped data frame with perfume details" />

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">4. Cleaning the perfume notes columns</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When it comes to perfume, it's more complex than just listing the top 10 most used ingredients. Each fragrance consists of top notes, which you smell first, followed by heart notes that emerge as the top notes dissipate, and finally, base notes that linger as the perfume wears off.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I cleaned up and ran a count of individual mentions of each ingredient in each one of these categories to find the most prevalent ingredients in each category.
        </p>

        <SmallScreenshot src={fragrancePyramid} alt="Fragrance pyramid showing top, heart and base notes" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          First, I went through the rows and counted how many times each ingredient was mentioned. This code iterates through each row, splits the 'TopNotes' into individual ingredients, increments their counts in a dictionary, and lastly, converts it into a series.
        </p>

        <CodeBlock>{`# Iterating over rows and counting the occurrences of ingredients listed in the 'TopNotes' column

top_ingredient_counts = {}

for index, row in df.iterrows():
    top_notes_list = row['TopNotes']
    if isinstance(top_notes_list, list):
        for ingredient in top_notes_list:
            top_ingredient_counts[ingredient] = top_ingredient_counts.get(ingredient, 0) + 1
    elif isinstance(top_notes_list, str):
        ingredients = [x.strip() for x in top_notes_list.split(',')]
        for ingredient in ingredients:
            top_ingredient_counts[ingredient] = top_ingredient_counts.get(ingredient, 0) + 1
top_ingredient_series = pd.Series(top_ingredient_counts, dtype=int)
print(top_ingredient_series)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          This is a good start; however, the series is still messy with random punctuation marks and the same ingredients being counted separately. This code cleans up the ingredient names and consolidates counts, merging counts for ingredients with slightly different representations.
        </p>

        <CodeBlock>{`# Cleaning the index values and aggregating the counts of ingredients

top_ingredient_counts = {}

for ingredient, count in top_ingredient_series_sorted.items():
    top_ingredient_cleaned = ingredient.replace('[', '').replace(']', '').replace("'", "")
    if top_ingredient_cleaned in top_ingredient_counts:
        top_ingredient_counts[top_ingredient_cleaned] += count
    else:
        top_ingredient_counts[top_ingredient_cleaned] = count
top_ingredient_series_cleaned = pd.Series(top_ingredient_counts, dtype=int)
print(top_ingredient_series_cleaned)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">And here is the final result. The same process was repeated for heart and base notes as well to collect these ingredients:</p>

        <SmallScreenshot src={ingredientCounts} alt="Cleaned ingredient counts series" />

        {/* Data Analysis */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Data Analysis</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Looking at the initial top notes table, only 58 out of 330 ingredients were mentioned more than 5 times. The full charts can be viewed in the Github repository, whereas I will mainly focus on the top 5 ingredients mentioned per category.
        </p>

        <Screenshot src={topNotesChart} alt="Counts of ingredients in top notes with values greater than 5" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Citrus scents dominate the top notes category. These are fresh, crowd-pleasing aromas that tend to be light and evaporate quite quickly. Pink pepper is the only non-citrus scent here adding a more floral and spicy note.
        </p>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Top 5 ingredients featured in Top Notes most often (n=330)</h3>
        <Screenshot src={topNotesBar} alt="Top 5 top notes bar chart" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Top 5 heart notes fully consist of florals, with Rose and Jasmine being the most popular choices of notes among perfumers. Florals offer medium longevity compared to citrus and are prominently featured down to the top 20. Heart notes are the most varied category and can also feature ingredients that are more typical for Top (ginger etc.) and Base notes (oud, vanilla).
        </p>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Top 5 ingredients featured in Heart Notes most often (n=420)</h3>
        <Screenshot src={heartNotesChart} alt="Top 5 heart notes bar chart" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Musk still dominates the base notes category, however, vanilla is a close second. Overall, there is less variety in the base notes category and they tend to include more woody and earthy scents.
        </p>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Top 5 ingredients featured in Base Notes most often (n=262)</h3>
        <Screenshot src={baseNotesChart} alt="Top 5 base notes bar chart" />

        <p className="text-muted-foreground leading-relaxed mb-6">
          Indeed, vanilla emerges as a prominent ingredient, ranking third among the top ingredients I've examined, following Musk and Bergamot.
        </p>

        {/* Key Takeaways */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Key Takeaways</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-3 mb-12">
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Ethical scraping is essential.</span>{" "}
            Limiting requests and respecting website content ensured responsible data collection without overloading the source.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Raw data requires significant cleaning.</span>{" "}
            Scraped ingredient lists contained duplicates, punctuation errors, and inconsistent formatting that required consolidation before analysis.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium text-foreground">Vanilla's popularity is confirmed.</span>{" "}
            Ranking third overall behind musk and bergamot, vanilla's prominence in recent releases validates the perfume community's observations about its growing trend.
          </li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default ParfumoScraping;
