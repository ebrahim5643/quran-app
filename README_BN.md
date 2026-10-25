# Quran App — GitHub Pages Upload Package

এই ZIP-এর ভেতরের ফাইলগুলো সরাসরি `ebrahim5643/quran-app` রিপোজিটরির **root**-এ রাখার জন্য প্রস্তুত। বাইরের ZIP ফাইলটিকে একা রিপোজিটরিতে আপলোড করবেন না; Extract করে ভেতরের ফাইলগুলো ব্যবহার করুন।

## কী আছে
- `index.html` — বাংলা মেনু, মূল PDF পৃষ্ঠা দেখা, পৃষ্ঠা নম্বর দিয়ে যাওয়া, PDF বুকমার্ক, হিফজ অনুশীলন ও অগ্রগতি
- `pages/001.webp`–`pages/614.webp` — ব্যবহারকারীর দেওয়া ৬১৪ পৃষ্ঠার PDF-এর স্ক্যান
- `sw.js` — GitHub Pages HTTPS-এ offline cache
- `manifest.json` ও `quran-app-icon-512.png` — ফোনে PWA হিসেবে ইনস্টল করার metadata/icon
- `.nojekyll` — GitHub Pages-এ Jekyll processing বন্ধ রাখে
- `SHA256SUMS.txt` — assets integrity checksums

## Android ফোনে Termux দিয়ে আপলোড করার প্রস্তাবিত পদ্ধতি
GitHub web upload-এ ৬১৪টি ছবির ফাইল একসঙ্গে সামলানো অসুবিধাজনক হতে পারে। Termux-এ Git ইনস্টল থাকলে:

1. ZIP ফাইলটি Downloads-এ রাখুন।
2. Termux-এ নিচের কমান্ডগুলো একে একে চালান (আগে storage permission না দিলে `termux-setup-storage` চালিয়ে অনুমতি দিন):

```sh
pkg install git unzip
termux-setup-storage
cd ~
mkdir -p QuranApp_GitHub_Upload
unzip ~/storage/downloads/QuranApp_GitHub_Upload.zip -d ~/QuranApp_GitHub_Upload
git clone https://github.com/ebrahim5643/quran-app.git
cd quran-app
cp -r ~/QuranApp_GitHub_Upload/index.html ~/QuranApp_GitHub_Upload/sw.js ~/QuranApp_GitHub_Upload/manifest.json ~/QuranApp_GitHub_Upload/quran-app-icon-512.png ~/QuranApp_GitHub_Upload/.nojekyll ~/QuranApp_GitHub_Upload/README_BN.md ~/QuranApp_GitHub_Upload/SHA256SUMS.txt ~/QuranApp_GitHub_Upload/pages .
git add index.html sw.js manifest.json quran-app-icon-512.png .nojekyll README_BN.md SHA256SUMS.txt pages
git commit -m "Update Quran app with source PDF pages and hifz tools"
git push origin HEAD
```

ZIP ফাইল অন্য ফোল্ডারে থাকলে `unzip` লাইনে সেই পথটি বদলাবেন। `git clone` যদি বলে ফোল্ডার আগে থেকেই আছে, নতুন করে clone করবেন না—পুরোনো রিপোজিটরির ভেতরে backup নিয়ে package-এর ফাইল copy করুন। GitHub authentication চাইলে অনুমোদিত sign-in/token পদ্ধতি ব্যবহার করুন; password এখানে লিখবেন না।

**সতর্কতা:** `cp` করার আগে clone করা রিপোজিটরির ফাইলগুলোর backup নিন। যদি `git push` authentication চায়, GitHub-এর অনুমোদিত sign-in/token পদ্ধতি ব্যবহার করুন; password এখানে লিখবেন না। যদি branch `main` না হয়ে অন্য নাম হয়, `git branch` দেখে সঠিক branch ব্যবহার করুন।

## ব্যবহার
- মূল কোরআনের পৃষ্ঠা দেখতে `READ QURAN · ORIGINAL PDF` খুলুন। পৃষ্ঠা ১–৬১৪ থেকে যেকোনো পৃষ্ঠা বেছে নেওয়া যায়।
- পৃষ্ঠার নিচের bookmark action দিয়ে পৃষ্ঠা সংরক্ষণ করা যায়।
- `HIFZ PRACTICE`-এ সবক, আমুখতা, সাত সবক তকরার কাউন্টার এবং মুখস্থ পরীক্ষার জন্য পৃষ্ঠা লুকানো/দেখানো আছে।
- Settings থেকে **৬১৪ পৃষ্ঠা অফলাইনে সংরক্ষণ করুন** চাপুন। প্রথমবার ইন্টারনেট ও প্রায় ৪৫ MB ফাঁকা browser storage লাগবে; শেষ হলে ছবিগুলো অফলাইনে খোলা যাবে।
- সূরা/পারা সূচি ও আরবি/বাংলা শব্দ অনুসন্ধানের text mode অনলাইন ডেটা ডাউনলোডের ওপর নির্ভর করে।

## যাচাইয়ের অবস্থা ও সীমাবদ্ধতা
- মূল PDF-এর পৃষ্ঠা সংখ্যা ৬১৪ নিশ্চিত করা হয়েছে।
- ZIP-এর সব পৃষ্ঠা asset 001–614 ধারাবাহিকভাবে আছে এবং WebP image হিসেবে decode হয় কি না যাচাই করা হয়েছে।
- `index.html` ও `sw.js`-এর JavaScript syntax পরীক্ষা করা হয়েছে; ZIP integrity পরীক্ষা করা হয়েছে।
- সূরা/পারা index-এর text-mode page mapping-কে মূল PDF-এর সঙ্গে সম্পূর্ণ যাচাই করা হয়নি। তাই PDF-এর সঙ্গে নির্ভুল পৃষ্ঠা মেলানোর জন্য মূল স্ক্যান-ভিউ ব্যবহার করুন।
- এটি GitHub Pages-এর ওয়েব/PWA প্যাকেজ। Android Studio APK আলাদা build/test প্রক্রিয়া। GitHub Pages-এ প্রকাশের পর ফোনে বাস্তব পরীক্ষা করা বাকি।
