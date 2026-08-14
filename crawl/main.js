 const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const os = require("os");

const url =
  "https://www.truyentranhphapbi.com/2021/07/doremon-truyen-dai-tap-9-tay-du-ky.html";

const picturesDir = "D:\\movie9";


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
        Referer: "https://www.truyentranhphapbi.com/",
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
            Referer: "https://www.truyentranhphapbi.com/",
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

    // console.log("\n--- HOÀN THÀNH ---");
    // console.log(`Ảnh đã lưu tại: ${picturesDir}`);
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}

downloadImages();
