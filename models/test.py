import numpy as np
import pandas as pd
import pydicom
from glob import glob
from tqdm import tqdm
# import mask function
import sys
sys.path.insert(0, '../input/siim-acr-pneumothorax-segmentation')
from mask_functions import rle2mask, mask2rle
# plotting function
from matplotlib import pyplot as plt