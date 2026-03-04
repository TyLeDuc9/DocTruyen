const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const os = require("os"); 

const url = "https://truyenqqno.com/truyen-tranh/cao-thu-bong-ro-remake-14065-chap-1.html";


const picturesDir = path.join(os.homedir(), "Pictures", "Truyen_Download");

async function downloadImages() {
  try {
 
    if (!fs.existsSync(picturesDir)) {
      fs.mkdirSync(picturesDir, { recursive: true });
      console.log("Đã tạo thư mục tại:", picturesDir);
    }

    const { data } = await axios.get(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" }
    });
    
    const $ = cheerio.load(data);

  
    const images = $(".story-see-content img, .page-chapter img"); 

    console.log(`Tìm thấy ${images.length} ảnh. Bắt đầu tải...`);

    for (let i = 0; i < images.length; i++) {
      const element = images[i];
     
      const imgUrl = $(element).attr("src") || $(element).attr("data-src") || $(element).attr("data-original");

      if (!imgUrl || !imgUrl.startsWith("http")) continue;

      try {
        const response = await axios({
          url: imgUrl,
          responseType: "stream",
          headers: { 
            'Referer': 'https://truyenqqno.com/',
            'User-Agent': 'Mozilla/5.0'
          }
        });

        const filePath = path.join(picturesDir, `image${i + 1}.jpg`);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        console.log(`Đã lưu: ${filePath}`);
      } catch (err) {
        console.log(`Lỗi tải ảnh ${i + 1}: ${err.message}`);
      }
    }
    console.log("--- HOÀN THÀNH ---");
    console.log(`Ảnh đã được lưu tại: ${picturesDir}`);

  } catch (error) {
    console.error("Lỗi kết nối:", error.message);
  }
}

downloadImages();