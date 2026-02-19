import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import bgrImage from "@/assets/portfolio/classification/bgr-image.jpg";
import waveletResult from "@/assets/portfolio/classification/wavelet-result.png";
import stackedImage from "@/assets/portfolio/classification/stacked-image.jpg";
import classificationReport from "@/assets/portfolio/classification/classification-report.png";
import multiLabelExample from "@/assets/portfolio/classification/multi-label-example.jpg";

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

const OralClassification = () => (
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
          Creating an Oral Disease Classification Model
        </h1>

        {/* Introduction */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The pandemic has adversely affected oral health at the practice level, as lockdowns have limited access to dental professionals. Additionally, individual oral care habits have deteriorated due to changes in dietary preferences and reduced engagement in oral hygiene practices.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          With practices being under pressure to serve populations with worsening oral health, some degree of pre-screening could help save valuable time in practice. I have created a classification model that will be able to identify common oral care concerns. The full code is available on <a href="https://github.com/Susanna-Uncover/Python-Data-Analytics-Projects/blob/21fa8f4f82319fa09ba3d1ade79c8244107ad01c/2%20Oral%20disease%20classifier.ipynb" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">GitHub</a>.
        </p>

        {/* Pre-requisites */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">Pre-requisites</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>Jupyter Notebook</li>
          <li>Oral diseases <a href="https://www.kaggle.com/datasets/salmansajid05/oral-diseases" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">Kaggle dataset</a></li>
          <li>This dataset contains folders dedicated to common oral diseases containing images of what these may look like</li>
          <li>Distorted and augmented versions of these images are also enclosed to improve the training and accuracy of the models</li>
        </ul>

        {/* What is Classification */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">What is Classification?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Classification is a method in machine learning where an algorithm is trained to categorise data into predefined labels or classes. It uses features of the data to predict which category new data points belong to, helping in tasks like spam detection, image recognition, and medical diagnosis.
        </p>

        {/* Why SVC */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Why SVC?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Support Vector Classification (SVC) is a machine learning algorithm that finds the best line or boundary to separate data into different classes. It uses the closest data points, called support vectors, to maximise the distance between classes, leading to accurate predictions.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          SVC is best used for tasks where a clear separation between classes is needed. For image classification, SVC is useful because it can handle complex data patterns and provides accurate results by maximising the margin between different image categories.
        </p>

        {/* Data and feature preparation */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Data and feature preparation</h2>

        <h3 className="font-display text-lg font-semibold mt-8 mb-3">1. Initial data preparation and cleaning</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To start with, I have loaded a single image up to take a look at it and try running some operations on it to test the code.
        </p>

        <CodeBlock>{`img = cv2.imread('kaggle/input/oral-diseases/Calculus/Calculus/(1).jpg')
img.shape
plt.imshow(img)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          You might have noticed that the image appears to be blue instead of loading up like it normally would. This is because I used OpenCV as part of this project. OpenCV handles colour channels differently from other image-processing libraries.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          OpenCV reads images in BGR (Blue, Green, Red) format, whereas most other libraries, including those used for displaying images like Matplotlib, expect images in RGB (Red, Green, Blue) format.
        </p>

        <SmallScreenshot src={bgrImage} alt="Image loaded with OpenCV showing BGR colour channels" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          I wanted to ensure that the images that the classifier was presented with included teeth for it to work. To ensure this, I have used a Haar smile cascade for the detection of specific features (like teeth).
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A Haar cascade is a machine learning-based approach for object detection. It uses a series of simple classifiers (Haar features) applied in stages to identify objects like faces, eyes, or other items in images. Each stage discards regions unlikely to contain the object, so only promising areas undergo further more detailed analysis.
        </p>

        

        <CodeBlock>{`smile_cascade = cv2.CascadeClassifier('kaggle/input/haar-cascades-for-face-detection/haarcascade_smile.xml')
smile = smile_cascade.detectMultiScale(gray, scaleFactor = 1.1, minNeighbors = 5, minSize = (30, 30))
for (x, y, w, h) in smile:
    cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
output_path = 'kaggle/working/image_with_teeth.jpg'
cv2.imwrite(output_path, img)
print('Image with detected teeth saved to:', output_path)`}</CodeBlock>

        {/* Creating labels and collecting directories */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">2. Creating labels and collecting directories</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The images that I used for classification are stored in specific folders named after common oral diseases. Then, I have collected the names of these folders using the 'os' module which provides a way to interact with the operating system.
        </p>

        <CodeBlock>{`# Scanning the directory using os python function
img_dirs = []
for entry in os.scandir(path_to_data):
    if entry.is_dir():
        img_dirs.append(entry.path)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          To parse through the images, I needed to collect the list of their directories. This code iterates through each file in the current directory, and checks if the file has an image extension. Finally, it constructs the full file path and appends it to the list corresponding to the disease name in the dictionary.
        </p>

        <CodeBlock>{`# Collecting file directories into a dictionary
oral_disease_file_names_dict = {}

for img_dir in img_dirs:
    disease_name = img_dir.split('/')[-1]
    oral_disease_file_names_dict[disease_name] = []
    for root, dirs, files in os.walk(img_dir):
        for file in files:
            if file.endswith(('.jpg', '.jpeg', '.png', '.bmp', '.gif')):
                file_path = os.path.join(root, file)
                oral_disease_file_names_dict[disease_name].append(file_path)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Lastly, I have created labels based on the directories collected so far. In this code, each disease name from the keys of the oral_disease_file_names_dict dictionary is assigned a numerical label. The resulting dictionary provides a mapping from disease names to numerical labels for the machine-learning algorithm.
        </p>

        <CodeBlock>{`# Creating the labels based on directories
class_dict = {}
count = 0
for disease_name in oral_disease_file_names_dict.keys():
    class_dict[disease_name] = count
    count = count + 1
class_dict`}</CodeBlock>

        <div className="my-8">
          <img src={waveletResult} alt="Image after wavelet decomposition showing edges and details" className="w-1/4 max-w-[200px] mx-auto rounded-xl border border-border" />
        </div>

        {/* Preparing data for classification */}
        <h3 className="font-display text-lg font-semibold mt-8 mb-3">3. Preparing the data for classification</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To enhance the features of the images I have designed a function to emphasise their edges and details using wavelet decomposition. This is useful in image processing tasks, including object detection, where edge information can significantly improve the accuracy and robustness of detection algorithms.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Wavelet decomposition is a mathematical technique used to break down an image into different frequency components at various scales or resolutions. This code defines a function w2d that processes an image to highlight its edges and details, making it easier to detect important features.
        </p>

        <CodeBlock>{`# Transforming the image to improve detection
def w2d(img, mode='haar', level=1):
    imArray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    coeffs = pywt.wavedec2(imArray, mode, level=level)
    coeffs[0] *= 0
    imArray_H = pywt.waverec2(coeffs, mode)
    imArray_H = np.clip(imArray_H, 0, 255)
    imArray_H = np.uint8(imArray_H)
    return imArray_H`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The code converts the image to grayscale, breaks the image into frequency components, removes the less relevant parts and finally converts the image into an 8-bit format. This is what the images will look like after I have applied this function to them.
        </p>

        <SmallScreenshot src={stackedImage} alt="Example of stacked original and wavelet-processed image" />

        <p className="text-muted-foreground leading-relaxed mb-4">
          I needed to prepare the dataset by stacking the original images and the distorted ones produced using the w2d function along with its corresponding disease label. Doing so helps address challenges such as variability in image quality, noise, and subtle differences between classes, leading to a more reliable and accurate model.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This code iterates through each disease category, loads associated training images, resizes them, applies the w2d function, and stacks both versions. The stacked images, along with their disease labels, are collected into lists x and y for training the machine learning model.
        </p>

        <CodeBlock>{`# Creating a stacked version of the image - original and distorted one
x, y = [], []
for disease_name, training_files in oral_disease_file_names_dict.items():
    for training_image in training_files:
        img = cv2.imread(training_image)
        scaled_orig_img = cv2.resize(img, (40, 30))
        img_har = w2d(img, 'db1', 5)
        scaled_img_har = cv2.resize(img_har, (40, 30))
        stacked_img = np.vstack((scaled_orig_img.reshape(40*30*3,1), scaled_img_har.reshape(40*30,1)))
        x.append(stacked_img)
        y.append(class_dict[disease_name])`}</CodeBlock>

        {/* Initial SVC modelling */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Initial SVC modelling</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          First, I have split the dataset into testing and training subsets by using the 'train_test_split' function from the scikit-learn library.
        </p>

        <CodeBlock>{`x_train, x_test, y_train, y_test = train_test_split(x, y, random_state = 0)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          This code trains an SVC model with RBF kernel on the training data, using feature scaling and regularisation, and then evaluates its performance on the test data. The pipeline ensures that feature scaling is applied consistently during both the training and testing phases.
        </p>

        <CodeBlock>{`# Training the initial SVC model
pipe = Pipeline([('scaler', StandardScaler()), ('svc', SVC(kernel = 'rbf', C = 10))])
pipe.fit(x_train, y_train)
pipe.score(x_test, y_test)`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The performance score came up to 0.703 for this initial test. Taking a closer look at the classification, the model does quite well with identifying Hypodontia, Ulcer and Gingivitis, but it's less effective when it comes to identifying Caries.
        </p>

        <SmallScreenshot src={classificationReport} alt="Classification report showing precision, recall and f1-score" />

        {/* Fine-tuning */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Fine-tuning the model</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          One of the ways through which the performance of the model can be improved is by fine-tuning the parameters used for modelling, such as the kernel, the regularisation parameter C and the gamma parameter which determines the influence of a single training example.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The optimal combination of parameters can be found by performing a Grid Search. Grid search is a technique used for hyperparameter tuning in machine learning, where you systematically search for the optimal combination of hyperparameters for a given model.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          One thing to note is that Grid search can be time-consuming and computationally demanding to run, especially in this case since I have 11403 images to work through. This version of the parameters grid is significantly trimmed down from the initial list of parameters I was aiming to test since it was taking over a day to compile.
        </p>

        <CodeBlock>{`param_grid = {
    'svc__kernel': ['rbf', 'linear'],
    'svc__C': [1, 10],
    'svc__gamma': [0.01, 0.1]
}`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          I switched to MinMaxScaler, which scales features to a fixed range [0,1] and can sometimes work better with certain algorithms. I also added PCA to reduce dimensionality, which can improve both performance and computation time.
        </p>

        <CodeBlock>{`pipe = make_pipeline(MinMaxScaler(), PCA(n_components=100), SVC())`}</CodeBlock>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The resulting hyperparameters that the grid search recommends as the most efficient ones are very close to the ones I have selected initially: Best hyperparameters: {`{'svc__C': 10, 'svc__gamma': 0.01, 'svc__kernel': 'rbf'}`}.
        </p>

        <CodeBlock>{`# Evaluating the best model on the test set
best_model = grid_search.best_estimator_
test_score = best_model.score(x_test, y_test)
print('Test set accuracy:', test_score)`}</CodeBlock>

        {/* Future consideration */}
        <h2 className="font-display text-2xl font-bold mt-12 mb-4">Future consideration</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Some of the difficulties in building an effective classification model for something as complex as oral diseases come down to the single-label approach I took due to the dataset used.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          While some patients may be presenting with just one indication, many would likely be presenting with several like in the image below (plaque and gingivitis). Because of this, a multi-label approach would likely be more successful.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Neural Network Architectures with multi-label output layers would be particularly beneficial for these sorts of tasks. Neural networks can enable end-to-end learning, allowing the model to automatically extract relevant features from the input data and learn complex relationships between features and labels.
        </p>

        <SmallScreenshot src={multiLabelExample} alt="Example showing multiple oral conditions in one image" />

      </div>
    </section>
  </Layout>
);

export default OralClassification;
