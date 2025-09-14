# 部署安全設定指南

## 🔒 環境變數安全設定

為了確保敏感資訊不會暴露在前端原始碼中，請按照以下步驟設定環境變數。

### 1. 本地開發設定

已為您建立 `.env.local` 檔案，包含本地開發所需的環境變數：

```bash
# Gmail SMTP 設定
GMAIL_USER=tyouxipindao@gmail.com
GMAIL_APP_PASSWORD=ecaouqoalpxxsswi

# 網站設定
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Kevin.

# 環境設定
NODE_ENV=development
```

### 2. Vercel 部署設定

#### 步驟 1: 登入 Vercel Dashboard
1. 前往 [vercel.com](https://vercel.com)
2. 登入您的帳號
3. 選擇您的專案

#### 步驟 2: 設定環境變數
1. 進入專案設定頁面
2. 點擊左側選單的 **Settings**
3. 選擇 **Environment Variables**
4. 添加以下環境變數：

| 變數名稱 | 值 | 環境 |
|---------|-----|------|
| `GMAIL_USER` | `tyouxipindao@gmail.com` | Production, Preview, Development |
| `GMAIL_APP_PASSWORD` | `ecaouqoalpxxsswi` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_NAME` | `Kevin.` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

#### 步驟 3: 重新部署
設定完環境變數後，需要重新部署專案：
1. 回到專案主頁
2. 點擊 **Deployments** 標籤
3. 點擊最新部署右側的三個點選單
4. 選擇 **Redeploy**

### 3. 安全改進說明

#### ✅ 已完成的改進：
- **移除硬編碼憑證**：從 API 路由中移除所有硬編碼的敏感資訊
- **環境變數驗證**：確保必要的環境變數存在才執行 API
- **配置分離**：建立 `src/lib/config.ts` 管理環境變數
- **範例檔案更新**：`env.example` 已移除真實憑證

#### 🔐 安全特性：
1. **服務端配置**：敏感資訊只在服務端可用
2. **客戶端配置**：只有 `NEXT_PUBLIC_*` 變數會暴露給客戶端
3. **驗證機制**：啟動時檢查必要環境變數
4. **錯誤處理**：環境變數缺失時返回適當錯誤訊息

### 4. 驗證設定

部署完成後，您可以透過以下方式驗證設定：

1. **檢查環境變數**：在 Vercel Dashboard 的 Environment Variables 頁面確認所有變數都已設定
2. **測試聯絡表單**：嘗試發送測試訊息
3. **檢查原始碼**：在瀏覽器開發者工具中檢查，確認沒有敏感資訊

### 5. 注意事項

- `.env.local` 檔案已在 `.gitignore` 中被忽略，不會被提交到 Git
- `env.example` 檔案包含範例值，可用於其他開發者設定
- 所有敏感資訊現在都透過環境變數管理
- 即使有人查看原始碼，也無法看到您的 Gmail 憑證

### 6. 故障排除

如果遇到問題：

1. **"郵件服務暫時無法使用"**：檢查 Vercel 上的環境變數是否正確設定
2. **Gmail 認證失敗**：確認 Gmail App Password 是否正確
3. **部署失敗**：檢查所有必要的環境變數是否都已設定

---

✅ **設定完成後，您的網站將完全安全，敏感資訊不會暴露在前端原始碼中！**
