# 🚀 Vercel 部署指南

本指南將幫助您將 Kevin 個人網站部署到 Vercel 平台。

## 📋 部署前準備

### 1. 確保代碼完整性
- ✅ 所有功能已測試完成
- ✅ 無編譯錯誤
- ✅ 無 TypeScript 錯誤
- ✅ 無 ESLint 警告

### 2. 準備環境變數
在 Vercel 部署時需要設置以下環境變數：

```
GMAIL_USER=tyouxipindao@gmail.com
GMAIL_APP_PASSWORD=ecaouqoalpxxsswi
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Kevin.
NODE_ENV=production
```

## 🚀 部署步驟

### 方法一：通過 Vercel CLI（推薦）

1. **安裝 Vercel CLI**
```bash
npm i -g vercel
```

2. **登入 Vercel**
```bash
vercel login
```

3. **部署到 Vercel**
```bash
vercel
```

4. **設置環境變數**
```bash
vercel env add GMAIL_USER
vercel env add GMAIL_APP_PASSWORD
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_SITE_NAME
vercel env add NODE_ENV
```

5. **重新部署以應用環境變數**
```bash
vercel --prod
```

### 方法二：通過 Vercel Dashboard

1. **連接 GitHub 倉庫**
   - 訪問 [vercel.com](https://vercel.com)
   - 點擊 "New Project"
   - 選擇您的 GitHub 倉庫

2. **配置專案**
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **設置環境變數**
   - 在專案設置中找到 "Environment Variables"
   - 添加所有必要的環境變數

4. **部署**
   - 點擊 "Deploy" 按鈕
   - 等待部署完成

## 🔧 部署配置說明

### vercel.json 配置
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["hkg1"],
  "functions": {
    "src/app/api/send-email/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### 重要配置說明：
- **regions**: 設置為 `["hkg1"]` 以使用香港節點，提升亞洲地區訪問速度
- **functions**: 為郵件 API 設置 30 秒超時
- **framework**: 自動識別 Next.js 框架

## 📧 郵件功能配置

### Gmail 應用程式密碼設置
1. 登入 Gmail 帳戶
2. 前往「Google 帳戶」→「安全性」
3. 啟用「兩步驟驗證」
4. 生成「應用程式密碼」
5. 使用生成的密碼作為 `GMAIL_APP_PASSWORD`

### 環境變數安全
- ✅ 不要在代碼中硬編碼敏感資訊
- ✅ 使用 Vercel 環境變數功能
- ✅ 定期更新應用程式密碼

## 🌐 自定義域名（可選）

### 設置自定義域名
1. 在 Vercel Dashboard 中選擇專案
2. 前往 "Settings" → "Domains"
3. 添加您的自定義域名
4. 按照指示設置 DNS 記錄

### DNS 設置
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 🔍 部署後檢查

### 功能測試清單
- [ ] 網站正常載入
- [ ] 導航功能正常
- [ ] 響應式設計正常
- [ ] 中英文切換正常
- [ ] 聯繫表單發送正常
- [ ] 社交媒體連結正常
- [ ] 作品集連結正常

### 性能檢查
- [ ] Lighthouse 分數 > 90
- [ ] 載入速度 < 3 秒
- [ ] 移動端體驗良好

## 🛠️ 故障排除

### 常見問題

1. **構建失敗**
   - 檢查 `package.json` 依賴
   - 確認 Node.js 版本兼容性
   - 查看構建日誌錯誤

2. **郵件發送失敗**
   - 檢查 Gmail 應用程式密碼
   - 確認環境變數設置正確
   - 檢查 Vercel 函數日誌

3. **環境變數未生效**
   - 確認變數名稱正確
   - 重新部署專案
   - 檢查 Vercel Dashboard 設置

### 日誌查看
```bash
# 查看部署日誌
vercel logs

# 查看函數日誌
vercel logs --function=send-email
```

## 📊 監控與維護

### 性能監控
- 使用 Vercel Analytics 監控網站性能
- 設置 Uptime 監控
- 定期檢查 Lighthouse 分數

### 安全維護
- 定期更新依賴套件
- 監控安全漏洞
- 備份重要數據

## 🎉 部署完成

恭喜！您的個人網站已成功部署到 Vercel。

### 後續步驟
1. 分享您的網站連結
2. 更新 LinkedIn 個人資料
3. 在作品集中添加網站連結
4. 定期更新內容和作品

---

**部署支援**
如有任何部署問題，請參考：
- [Vercel 官方文檔](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [Vercel 社群支援](https://github.com/vercel/vercel/discussions)
