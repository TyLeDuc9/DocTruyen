 const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const os = require("os");

const url =
  "https://truyenqqko.com/truyen-tranh/doi-quan-doraemon-dac-biet-21362-chap-14";

const picturesDir = "D:\\14";


async function downloadImages() {
  try {
    if (!fs.existsSync(picturesDir)) {
      fs.mkdirSync(picturesDir, { recursive: true });
    }

    console.log("Đang tải trang...");

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Referer: "https://truyenqqko.com/",
      },
    });

    fs.writeFileSync("page.html", data);
    console.log("Đã lưu page.html");

    const $ = cheerio.load(data);

    const images = $("img");

    console.log(`Tổng số thẻ img: ${images.length}`);

    const imageUrls = [];

    images.each((index, element) => {
      const imgUrl =
        $(element).attr("src") ||
        $(element).attr("data-src") ||
        $(element).attr("data-original") ||
        $(element).attr("data-lazy-src");

      if (imgUrl && imgUrl.startsWith("http")) {
        imageUrls.push(imgUrl);
      }
    });

    console.log(`Tìm thấy ${imageUrls.length} URL ảnh`);

    if (imageUrls.length === 0) {
      console.log(
        "Không tìm thấy ảnh. Hãy mở file page.html để kiểm tra HTML thực tế."
      );
      return;
    }

    for (let i = 0; i < imageUrls.length; i++) {
      const imgUrl = imageUrls[i];

      console.log(`[${i + 1}/${imageUrls.length}] ${imgUrl}`);

      try {
        const response = await axios({
          method: "GET",
          url: imgUrl,
          responseType: "stream",
          headers: {
        Referer: "https://truyenqqko.com/",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
          },
        });

        const ext =
          path.extname(new URL(imgUrl).pathname) || ".jpg";

        const filePath = path.join(
          picturesDir,
          `image_${String(i + 1).padStart(3, "0")}${ext}`
        );

        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        console.log(`Đã lưu: ${filePath}`);
      } catch (err) {
        console.log(
          `Lỗi tải ảnh ${i + 1}:`,
          err.response?.status || err.message
        );
      }
    }

    console.log("\n--- HOÀN THÀNH ---");
    console.log(`Ảnh đã lưu tại: ${picturesDir}`);
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}

downloadImages();

// const axios = require("axios");
// const cheerio = require("cheerio");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");

// const url = "https://nettruyenviet10.com/truyen-tranh/doraemon-truyen-dai-nxb-kim-dong/chuong-24";
// const picturesDir = "D:\\movie24";

// async function downloadImages() {
//   try {

//     if (!fs.existsSync(picturesDir)) {
//       fs.mkdirSync(picturesDir, { recursive: true });
//       console.log("Đã tạo thư mục tại:", picturesDir);
//     }

//     const { data } = await axios.get(url, {
//       headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//         "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
//         "Referer": "https://nettruyenviet10.com/",
//         "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
//         "Sec-Ch-Ua-Mobile": "?0",
//         "Sec-Ch-Ua-Platform": '"Windows"',
//         "Sec-Fetch-Dest": "document",
//         "Sec-Fetch-Mode": "navigate",
//         "Sec-Fetch-Site": "none",
//         "Sec-Fetch-User": "?1",
//         "Upgrade-Insecure-Requests": "1"
//       }
//     });

//     const $ = cheerio.load(data);


//     const images = $(".story-see-content img, .page-chapter img");

//     console.log(`Tìm thấy ${images.length} ảnh. Bắt đầu tải...`);

//     for (let i = 0; i < images.length; i++) {
//       const element = images[i];

//       const imgUrl = $(element).attr("src") || $(element).attr("data-src") || $(element).attr("data-original");

//       if (!imgUrl || !imgUrl.startsWith("http")) continue;

//       try {
//         const response = await axios({
//           url: imgUrl,
//           responseType: "stream",
//           headers: {
//             // 'Referer': 'https://truyenqqno.com/',
//             // 'Referer': "https://nettruyenviet10.com/",
//             'Referer': "https://nettruyenviet10.com/",

//             'User-Agent': 'Mozilla/5.0'
//           }
//         });

//         const filePath = path.join(picturesDir, `image${i + 1}.jpg`);
//         const writer = fs.createWriteStream(filePath);

//         response.data.pipe(writer);

//         await new Promise((resolve, reject) => {
//           writer.on('finish', resolve);
//           writer.on('error', reject);
//         });

//         console.log(`Đã lưu: ${filePath}`);
//       } catch (err) {
//         console.log(`Lỗi tải ảnh ${i + 1}: ${err.message}`);
//       }
//     }
//     console.log("--- HOÀN THÀNH ---");
//     console.log(`Ảnh đã được lưu tại: ${picturesDir}`);

//   } catch (error) {
//     console.error("Lỗi kết nối:", error.message);
//   }
// }

// downloadImages();

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");

// const url = "https://nettruyenviet10.com/truyen-tranh/doraemon-truyen-dai-nxb-kim-dong/chuong-15";
// const picturesDir = "D:\\movie15";

// async function downloadImages() {
//   if (!fs.existsSync(picturesDir)) {
//     fs.mkdirSync(picturesDir, { recursive: true });
//     console.log("Đã tạo thư mục tại:", picturesDir);
//   }

//   console.log("Đang khởi chạy trình duyệt hiển thị...");
  
//   const browser = await puppeteer.launch({ 
//     headless: false, 
//     protocolTimeout: 300000, 
//     args: [
//       '--no-sandbox', 
//       '--disable-setuid-sandbox',
//       '--disable-blink-features=AutomationControlled'
//     ]
//   });
  
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1280, height: 900 });
//   await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");

//   // Tập hợp lưu trữ tất cả các ảnh bắt được từ Network
//   const networkImages = new Set();

//   page.on('response', (response) => {
//     const reqUrl = response.url();
//     const reqType = response.request().resourceType();

//     if (reqType === 'image' || reqUrl.match(/\.(jpeg|jpg|png|webp)/i)) {
//       if (!reqUrl.includes("logo") && !reqUrl.includes("avatar") && !reqUrl.includes("icon") && reqUrl.startsWith("http")) {
//         networkImages.add(reqUrl);
//       }
//     }
//   });

//   try {
//     console.log("Đang truy cập trang web...");
//     await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });

//     console.log("Đợi trang ổn định 5 giây (Hãy click vượt Captcha nếu màn hình yêu cầu)...");
//     await new Promise(resolve => setTimeout(resolve, 5000));

//     console.log("Bắt đầu cuộn trang tự động cho đến khi chạm đáy truyện...");
    
//     let scrollAttempts = 0;
//     const maxAttempts = 400; 

//     while (scrollAttempts < maxAttempts) {
//       await page.keyboard.press('PageDown');
      
//       // FIX 1: Tăng thời gian nghỉ từ 300ms lên 600ms giúp Lazy-load kích hoạt kịp và không bị sót ảnh
//       await new Promise(resolve => setTimeout(resolve, 600)); 
      
//       scrollAttempts++;

//       if (scrollAttempts % 5 === 0) {
//         const checkScroll = await page.evaluate(() => {
//           return {
//             newHeight: document.body.scrollHeight,
//             currentScrollTop: window.pageYOffset + window.innerHeight
//           };
//         });

//         if (checkScroll.currentScrollTop >= checkScroll.newHeight - 200) {
//           console.log("Đang áp sát đáy, chờ kiểm tra lazy-load nội dung...");
//           // Đợi hẳn 3 giây ở cuối trang xem còn ảnh nào đang tải nốt không
//           await new Promise(resolve => setTimeout(resolve, 3000));
          
//           const reCheckHeight = await page.evaluate('document.body.scrollHeight');
//           if (checkScroll.currentScrollTop >= reCheckHeight - 200) {
//             console.log(`Đã chạm đáy trang web thành công ở lần cuộn thứ ${scrollAttempts}.`);
//             break;
//           }
//         }
//       }
//     }

//     console.log("Sắp xếp lại thứ tự ảnh dựa trên DOM để tránh bị đảo lộn trang truyện...");
    
//     // FIX 2: Quét các thẻ img của truyện để lấy danh sách link theo đúng thứ tự từ trên xuống dưới
//     const orderedImgUrls = await page.evaluate((capturedUrls) => {
//       // Tìm các khu vực chứa ảnh truyện của NetTruyen
//       const images = document.querySelectorAll(".page-chapter img, .reading-detail img");
//       const result = [];
      
//       images.forEach(img => {
//         let src = img.getAttribute('data-original') || img.getAttribute('data-src') || img.getAttribute('src');
//         if (src) {
//           if (src.startsWith('//')) src = 'https:' + src;
          
//           // Kiểm tra xem link này có nằm trong tập hợp Network đã bắt được không
//           if (capturedUrls.includes(src)) {
//             result.push(src);
//           }
//         }
//       });
      
//       // Nếu quét DOM chuẩn thứ tự bị thiếu, thì lấy toàn bộ ảnh từ Network làm dự phòng
//       return result.length > 0 ? result : capturedUrls;
//     }, Array.from(networkImages));

//     if (orderedImgUrls.length === 0) {
//       console.log("Vẫn không bắt được ảnh từ Network. Đang chụp ảnh màn hình hiện tại để kiểm tra...");
//       await page.screenshot({ path: path.join(picturesDir, "screen_error.png") });
//       return;
//     }

//     console.log(`Thành công! Tìm thấy tổng cộng ${orderedImgUrls.length} ảnh hợp lệ. Bắt đầu tải về máy...`);

//     for (let i = 0; i < orderedImgUrls.length; i++) {
//       const imgUrl = orderedImgUrls[i];
//       try {
//         const response = await axios({
//           url: imgUrl,
//           responseType: "stream",
//           headers: {
//             'Referer': 'https://nettruyenviet10.com/', 
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
//           },
//           timeout: 20000 // Tăng timeout lên 20s đề phòng mạng nghẽn
//         });

//         const filePath = path.join(picturesDir, `image_${String(i + 1).padStart(3, '0')}.jpg`);
//         const writer = fs.createWriteStream(filePath);
//         response.data.pipe(writer);

//         await new Promise((resolve, reject) => {
//           writer.on('finish', resolve);
//           writer.on('error', reject);
//         });

//         console.log(`[${i + 1}/${orderedImgUrls.length}] Đã lưu: image_${String(i + 1).padStart(3, '0')}.jpg`);
//       } catch (err) {
//         console.log(`Bỏ qua ảnh lỗi thứ ${i + 1}: ${err.message}`);
//       }
//     }

//     console.log("\n--- HOÀN THÀNH ---");
//     console.log(`Toàn bộ ảnh truyện đã được lưu đầy đủ tại: ${picturesDir}`);

//   } catch (error) {
//     console.error("Lỗi phát sinh:", error.message);
//   } finally {
//     await browser.close();
//   }
// }

// downloadImages();