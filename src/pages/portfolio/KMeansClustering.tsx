import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import nullValues from "@/assets/portfolio/kmeans/null-values.png";
import demographics1 from "@/assets/portfolio/kmeans/demographics-1.png";
import demographics2 from "@/assets/portfolio/kmeans/demographics-2.png";
import demographics3 from "@/assets/portfolio/kmeans/demographics-3.png";
import totalSpend from "@/assets/portfolio/kmeans/total-spend.png";
import salesChannels from "@/assets/portfolio/kmeans/sales-channels.png";
import correlationHeatmap from "@/assets/portfolio/kmeans/correlation-heatmap.jpg";
import elbowMethod from "@/assets/portfolio/kmeans/elbow-method.jpg";
import clusters3d from "@/assets/portfolio/kmeans/3d-clusters.jpg";
import clusterDistribution from "@/assets/portfolio/kmeans/cluster-distribution.png";
import segment1 from "@/assets/portfolio/kmeans/segment-1.jpg";
import segment2 from "@/assets/portfolio/kmeans/segment-2.jpg";
import segment3 from "@/assets/portfolio/kmeans/segment-3.jpg";
import segment4 from "@/assets/portfolio/kmeans/segment-4.jpg";

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

const KMeansClustering = () => (
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
          Creating a Customer Segmentation for a Department Store Using K-means
        </h1>

        {/* Introduction */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Customer segmentation helps businesses group similar customers based on their characteristics or behaviours. Segmentation is widely used to enable targeted marketing and personalised recommendations.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          I have created a segmentation using K-means to help a department store better target its customers. The full code is available on <a href="https://github.com/Susanna-Uncover/Python-Data-Analytics-Projects/blob/21fa8f4f82319fa09ba3d1ade79c8244107ad01c/1%20Customer%20segmentation%20using%20k-means.ipynb" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">GitHub</a>.
        </p>

        {/* Pre-requisites */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Pre-requisites</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>Jupyter Notebook</li>
          <li><a href="https://www.kaggle.com/datasets/imakash3011/customer-personality-analysis" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">Kaggle dataset</a></li>
        </ul>

        {/* Objectives */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Project objectives</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>Clustering the customer data based on shared traits and shopping behaviours</li>
          <li>Describe the clusters, identifying what behaviours and traits are specific to them</li>
        </ul>

        {/* Why K-means */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Why K-means?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          K-means is a simple and effective clustering algorithm that partitions data into a pre-defined number of clusters. It works by iteratively assigning data points to the nearest cluster centre and updating the cluster centres based on the mean of the assigned points.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          K-means is a good choice for segmentation because it's quick, scalable, and easy to implement. It's useful when the number of clusters is known beforehand and the data has well-defined clusters with roughly equal variance. Additionally, it's versatile and can handle large datasets efficiently.
        </p>

        {/* Data Preparation */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Data preparation and exploration</h2>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">1. Initial data overview and cleaning</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The CSV file is quite complete as it only has 24 NULL values which makes the data-cleaning process easier. Overall, the data frame consists of 2240 rows and 29 columns, meaning I might need to be selective about the features that will be used for clustering.
        </p>

        <div className="my-8">
          <img src={nullValues} alt="NULL values count per column" className="w-1/4 max-w-[200px] mx-auto rounded-xl border border-border" />
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Looking at the data, the age column seems to be missing which can easily be defined based on the year of birth of the customer and the current year (this ensures the data stays accurate):
        </p>

        <CodeBlock>{`# Creating an age column based on the year of birth
current_year = dt.datetime.now().year
df['Age'] = current_year - df['Year_Birth']`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          I also checked the income and age columns for outliers and removed any particularly outstanding values as such:
        </p>

        <CodeBlock>{`# Exploring the outliers for age
customers_over_100 = df[df['Age'] > 100]
num_customers_over_100 = len(customers_over_100)

print('N of customers over the age of 100:', num_customers_over_100)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The income column included one person with an income of 666K, which is an outlier, so let's remove the row alongside the NULL values:
        </p>

        <CodeBlock>{`# Removing outliers
df = df[df['Income'] <= 200000]
df = df.dropna(subset=['Income'])`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Checking the Marital Status column for unique values reveals that a few of the customers like sharing humorous responses:
        </p>

        <CodeBlock>{`array(['Single', 'Together', 'Married', 'Divorced', 'Widow', 'Alone',
'Absurd', 'YOLO'], dtype=object)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          I have standardised the answers to make the data more usable and drop rows like 'Absurd' and 'YOLO' since I couldn't be sure what the status of these respondents is.
        </p>

        <CodeBlock>{`# Cleaning the Marital status column
df['Marital_Status'] = df['Marital_Status'].replace({'Alone':'Single','Widow':'Widowed', 'Together':'Dating'})
df = df[~df['Marital_Status'].isin(['YOLO', 'Absurd'])]`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          I have done the same for the education column to make this data more usable:
        </p>

        <CodeBlock>{`# Cleaning the Education column
df['Education'] = df['Education'].replace({'Basic':'Sec school','2n Cycle':'Masters', 'Graduation':'Bachelors',
'Master':'Masters', 'PhD':'Doctorate'})`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          I have two columns indicating that customers have children or teens at home. Let's combine the values and list them in one column 'n_minors_home' and clarify whether the customer is a parent.
        </p>

        <CodeBlock>{`# Fleshing out the data around parenthood
df['N_minors_home'] = df['Kidhome'] + df['Teenhome']
df['Parent'] = np.where(df.N_minors_home> 0, 1, 0)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Lastly, I have renamed product purchase columns with complex names (e.g., MntFishProducts) and defined a column containing the total amount customers spent on various products as 'TotalSpend' to make it easier to compare how much they spend.
        </p>

        <CodeBlock>{`# Defining a spend column based on individual categories
df['TotalSpend'] = df['Wines'] + df['Fruits'] + df['Meat'] + df['Fish'] + df['Sweets'] + df['Gold']`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-6">
          With the data cleaning done, I am down to 2208 rows which is sufficient for this project.
        </p>

        {/* Exploration */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">2. Exploration and visualisation</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Since most of this section involves plotting data, I will omit these specific code samples, they can all be found on this project's GitHub page. Instead, let's review the customer data before proceeding with clustering.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Firstly, the majority of the customers are over the age of 40 and many of them earn more than the average US citizen (37,585 USD (2022)) meaning they are better off than the average.
        </p>

        <div className="my-8 grid grid-cols-2 gap-4 items-stretch">
          <div className="rounded-xl border border-border overflow-hidden">
            <img
              src={demographics1}
              alt="Customer demographics by age and income"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <img
              src={demographics2}
              alt="Customer demographics by education, marital status and parenthood"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The majority of these customers are parents, with at least one child, although quite a few of them are DINKs with no kids in the house. Most of them are married or dating and have a bachelor's degree or higher.
        </p>

        <Screenshot src={demographics3} alt="Customer spending by product category" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Most customers have spent a minimal amount of money with the department store over the last 2 years (under 500 USD). The spending looks consistent across all product categories, with most customers spending minimally across all categories.
        </p>

        <Screenshot src={totalSpend} alt="Number of customers by total spend" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Looking at the sales channels customers engage with, in-store is the most successful when it comes to driving sales with most customers making at least 3 purchases. Online shopping is also a popular option with most shoppers making at least 2 purchases. The catalogue is the least popular option and many customers don't engage with this sales channel.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Deals are successful when it comes to engaging customers since the majority of them made at least one or more purchases via discounts and only a handful do not engage with deals.
        </p>

        <Screenshot src={salesChannels} alt="Sales channels and deal engagement" />

        {/* Preparing data for clustering */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">3. Preparing the data for clustering</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Now, let's explore the correlation coefficients of the data using a correlation heatmap.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I'm less interested in the metrics around the point where customers tend to respond to campaigns shared by the department store since they don't seem to have a strong relationship with most other columns. I also left out complaints and responses for similar reasons.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Lastly, columns like the year of birth and whether customers have kids or teens at home are better covered by other columns I have created so I left them out.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This leaves us with 15 columns including:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>Demographic information like income, age, information about kids and parenthood</li>
          <li>Product categories plus their total spend</li>
          <li>Sales channels customers engage with</li>
          <li>Engagement with discounts</li>
        </ul>

        <Screenshot src={correlationHeatmap} alt="Correlation heatmap of selected features" />

        {/* Normalisation and Clustering */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">4. Data Normalisation and Clustering</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          First, I need to perform z-score normalisation or standardisation on the shortened data frame. By applying z-score normalisation, I have ensured that each feature in the dataset has a mean of 0 and a standard deviation of 1, which is essential for K-means since the algorithm is distance-based and sensitive to differences in feature scales.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Using the fit_transform() method of the scaler object I have fitted the scaler to the data and transformed it simultaneously. This process computed the mean and standard deviation of each feature in the dataset and then standardises the features by subtracting the mean and dividing by the standard deviation.
        </p>

        <CodeBlock>{`# Applying z-score normalisation
scaler = StandardScaler()

# Fitting the scaler to the data and transforming it
df_scaled = pd.DataFrame(scaler.fit_transform(df_trimmed), columns = df_trimmed.columns)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Then, I needed to perform Principal Component Analysis (PCA) to reduce the dimensionality of the standardised data. PCA is a technique used for dimensionality reduction by transforming the original variables into a new set of uncorrelated variables called principal components (3 in this case).
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I reduced the data to 3 principal components, which captured the majority of variance while enabling 3D visualisation.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Reducing dimensionality means reducing the number of variables in a dataset to simplify it and make it more manageable.
        </p>

        <CodeBlock>{`# Initiating PCA to reduce dimensions aka features to 3 and transforming the data
dim_ds = pd.DataFrame(PCA(n_components = 3).fit_transform(df_scaled), columns = ['column1', 'column2', 'column3'])

dim_ds.describe().T`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Then, I needed to determine the number of clusters that would be used, since K-means requires a specific number of clusters to split the data. This can be achieved using the elbow method.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The elbow method is a technique for finding the optimal number of clusters in a dataset for clustering algorithms like K-means. It involves plotting the within-cluster sum of squares against the number of clusters and identifying the 'elbow point'—in this case, 4.
        </p>

        <Screenshot src={elbowMethod} alt="Elbow method showing optimal K=4" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Now everything is in place to initialise K-means clustering. This code initialises and fits a KMeans clustering model with 4 clusters to the dataset. It assigns cluster labels to each data point and adds these labels as a new column ('ClustersK').
        </p>

        <CodeBlock>{`# Defining the number of clusters (K)
num_clusters = 4

# Initialising and fitting the KMeans model
kmeans = KMeans(n_clusters = num_clusters, n_init = 10)
cluster_labels = kmeans.fit_predict(dim_ds)
df_trimmed['ClustersK'] = cluster_labels`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Now, I have checked the results of the clustering. It looks like the clusters are reasonably distinct looking at the 3D visualisation. I have also checked the distribution of the clusters to make sure they are balanced. Cluster 3 has quite a few more entries, but none of the clusters are looking underfilled which is positive.
        </p>

        <div className="my-8 grid grid-cols-2 gap-4 items-center">
          <div className="rounded-xl border border-border overflow-hidden">
            <img src={clusters3d} alt="3D visualisation of the 4 clusters" className="w-full h-auto" />
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <img src={clusterDistribution} alt="Distribution of the clusters" className="w-full h-auto" />
          </div>
        </div>

        {/* Meet the segments */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Meet the segments</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The segments can now be defined based on the features selected earlier. I have plotted the distribution of values of these features in a 5 x 3 grid so I could get a quick overview of each segment as such:
        </p>

        <CodeBlock>{`# Showcasing the data for cluster 0
cluster_0_df = df_trimmed[df_trimmed['ClustersK'] == 0]

variable_names = [col for col in cluster_0_df.columns if col != 'ClustersK']
colors = ['#2e2237']
n_variables = len(variable_names)
n_rows = (n_variables - 1) // 5 + 1
fig, axes = plt.subplots(n_rows, 5, figsize=(15, 3 * n_rows), squeeze=False)

for i, variable in enumerate(variable_names):
    row = i // 5
    col = i % 5
    ax = axes[row, col]
    cluster_0_df[variable].plot.hist(ax=ax, bins=20, color=colors)
    ax.set_title(f'Distribution of {variable}')
    ax.set_xlabel(variable)
    ax.set_ylabel('Frequency')

for i in range(n_variables, n_rows * 5):
    fig.delaxes(axes.flatten()[i])
plt.tight_layout()
plt.show()`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          With the code and the output being quite bulky, I will not insert the charts for every segment, but with a bit of analysis, it's easy to sum this data up in neat and easy-to-read segment cards.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          And when summed up, the segment cards look like this! Thanks to K-means clustering I have landed on 4 distinct segments with their own shopping preferences and behaviours.
        </p>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Segment 1: Mid-income deal hunters</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">A sizeable and important segment:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>Most are parents with at least 1 - 2 children</li>
          <li>Tend to have mid income 45 - 60K USD</li>
          <li>Mid-level spending, 250-650 USD</li>
          <li>More interested in deals than other segments with 3 - 5 deals purchased</li>
          <li>Lower interest in catalogue shopping (1 - 2 purchases), average interest in online (4 - 5), average store purchases (5 - 10)</li>
          <li>Interested in wines, meat and gold, lower interest in sweets, fruits, fish</li>
        </ul>
        <Screenshot src={segment1} alt="Segment 1: Mid-income deal hunters" />

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Segment 2: High-income in-store lovers</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">Smallest, but high value group:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>Most are parents with 1 child</li>
          <li>High income 70 - 80K USD</li>
          <li>High spenders, 800-1,200 USD</li>
          <li>Moderate interest in deals with 2 - 3 deals purchased</li>
          <li>High interest in online shopping (5 - 7)</li>
          <li>Highest interest in in-store shopping (8-10)</li>
          <li>Mid interest in catalogue</li>
          <li>Very interested in wines, meat and gold</li>
        </ul>
        <Screenshot src={segment2} alt="Segment 2: High-income in-store lovers" />

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Segment 3: Lower-income visitors</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">Our largest segment:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>Most are parents with 1 child, some childless</li>
          <li>Lower income 30 - 40K USD</li>
          <li>Low spenders, 0 - 200 USD</li>
          <li>Moderate interest in deals with 2 - 3 deals purchased</li>
          <li>Lower engagement with catalogue and online, they average about 2-3 store visits</li>
          <li>Low spending across all categories with some interest in meat</li>
        </ul>
        <Screenshot src={segment3} alt="Segment 3: Lower-income visitors" />

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Segment 4: Affluent single regulars</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">Second largest and high value segment:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>Most are single and don't have children</li>
          <li>High income 70 - 80K USD</li>
          <li>High spenders, 800-1,200 USD</li>
          <li>Moderate interest in deals with 2 - 3 deals purchased</li>
          <li>Highest engagement with catalogue (5) average for online and in-store (5-10)</li>
          <li>High spending across all categories, especially wines, sweets, fruits and meat</li>
        </ul>
        <Screenshot src={segment4} alt="Segment 4: Affluent single regulars" />

      </div>
    </section>
  </Layout>
);

export default KMeansClustering;
