const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const url =
  "https://truyenqq.com.vn/tham-tu-lung-danh-conan-ke-hanh-phap-zero/chapter-1";

const picturesDir = "D:\\2";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",

  "Accept-Language":
    "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",

  Referer: "https://truyenqq.com.vn/",
};

async function downloadImages() {
  try {
    // =========================
    // TẠO THƯ MỤC
    // =========================

    if (!fs.existsSync(picturesDir)) {
      fs.mkdirSync(picturesDir, {
        recursive: true,
      });
    }

    console.log("Đang tải trang...");

    // =========================
    // LẤY HTML
    // =========================

    const { data } = await axios.get(url, {
      headers,
      timeout: 30000,
    });

    console.log("Đã tải HTML");

    const $ = cheerio.load(data);

    // =========================
    // LẤY ẢNH TRUYỆN
    // =========================

    const images = $("img.lazy");

    console.log(
      `Tìm thấy ${images.length} ảnh truyện`
    );

    if (images.length === 0) {
      console.log("Không tìm thấy ảnh!");
      return;
    }

    // =========================
    // DOWNLOAD TỪNG ẢNH
    // =========================

    for (let i = 0; i < images.length; i++) {
      const element = images[i];

      // QUAN TRỌNG:
      // lấy data-src trước src
      const imgUrl =
        $(element).attr("data-src") ||
        $(element).attr("data-original") ||
        $(element).attr("src");

      if (!imgUrl) {
        console.log(
          `Bỏ qua ảnh ${i + 1}: không có URL`
        );
        continue;
      }

      console.log(
        `\n[${i + 1}/${images.length}]`
      );

      console.log(imgUrl);

      try {
        const response = await axios.get(imgUrl, {
          responseType: "arraybuffer",

          headers: {
            "User-Agent":
              headers["User-Agent"],

            Referer: url,

            Accept:
              "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          },

          timeout: 30000,
        });

        // =========================
        // LẤY EXTENSION
        // =========================

        const parsedUrl = new URL(imgUrl);

        let ext = path.extname(
          parsedUrl.pathname
        );

        if (!ext) {
          ext = ".jpg";
        }

        // =========================
        // TÊN FILE
        // =========================

        const fileName =
          `image_${String(i + 1).padStart(3, "0")}${ext}`;

        const filePath = path.join(
          picturesDir,
          fileName
        );

        // =========================
        // LƯU FILE
        // =========================

        fs.writeFileSync(
          filePath,
          response.data
        );

        console.log(
          `Đã lưu: ${fileName}`
        );
      } catch (error) {
        console.log(
          `Lỗi ảnh ${i + 1}:`,
          error.response?.status ||
            error.message
        );
      }
    }

    console.log("\n==========================");
    console.log("        HOÀN THÀNH");
    console.log("==========================");

    console.log(
      `Ảnh được lưu tại: ${picturesDir}`
    );
  } catch (error) {
    console.error(
      "Lỗi:",
      error.response?.status ||
        error.message
    );
  }
}

downloadImages();