# Groq API 安全設置指南

## 1. 在 Groq Console 管理 API Key

### 實際可用的功能：

**⚠️ 重要**：Groq Console 目前**只支持重命名 API Key**，不支持域名限制、速率限制等進階功能。

### 建議操作：

1. **登入 Groq Console**
   - 前往：https://console.groq.com/
   - 使用您的帳號登入

2. **重命名 API Key（可選）**
   - 進入 "API Keys" 頁面
   - 找到您的 API Key
   - 可以為它設置一個描述性的名稱，例如：`kevinoffical.vercel.app`

3. **監控使用量**
   - 定期查看使用統計
   - 注意是否有異常的使用模式
   - 如果發現異常，立即撤銷並重新生成 API Key

## 2. 在 Vercel 設置環境變數

1. **前往 Vercel Dashboard**
   - 進入您的專案：https://vercel.com/dashboard
   - 選擇專案 `kevin` 或您的專案名稱

2. **設置環境變數**
   - 點擊 "Settings" → "Environment Variables"
   - 添加新的環境變數：
     - **名稱**：`NEXT_PUBLIC_GROQ_API_KEY`
     - **值**：您的 Groq API Key
     - **環境**：勾選全部（Production、Preview、Development）

3. **重新部署**
   - 在 Deployments 頁面
   - 選擇最新部署
   - 點擊 "Redeploy" 使環境變數生效

## 3. 監控和維護

### 定期檢查：
- 每週查看 Groq Console 的使用統計
- 檢查是否有異常的請求模式
- 如果發現異常使用，立即：
  1. 到 Groq Console 撤銷舊的 API Key
  2. 生成新的 API Key
  3. 更新 Vercel 環境變數
  4. 重新部署

### 安全提示：
- ✅ API Key 只存在 Vercel 環境變數中，不要提交到 Git
- ✅ 定期更換 API Key（建議每 3-6 個月）
- ✅ 監控使用量，設置合理的限制
- ✅ 不要在公開的地方分享您的 API Key

## 4. 域名限制說明（已實現 ✅）

**重要說明**：Groq API 目前不支持服務端的域名限制功能，這是正常的情況。

### 已實現的代碼層級保護：

在 `src/components/AIAssistant.tsx` 中，我們已經添加了域名檢查：

```typescript
const ALLOWED_ORIGINS = [
  'https://kevinoffical.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
]
```

### 保護機制：

- ✅ AI 助理只在指定的域名下工作
- ✅ 如果在其他域名使用，會顯示錯誤訊息："AI 服務僅在授權域名下可用"
- ✅ 這是目前最有效的保護方式

### 安全保護措施總結：

1. ✅ **代碼層級域名檢查**（已實現）
   - 只允許在 `https://kevinoffical.vercel.app` 使用
   - 阻止其他域名的未授權使用

2. ✅ **環境變數管理**
   - API Key 存儲在 Vercel 環境變數中
   - 不會提交到 Git 倉庫

3. ✅ **監控使用量**
   - 定期查看 Groq Console 使用統計
   - 發現異常立即處理

### 建議的安全實踐：

- ✅ 定期更換 API Key（建議每 3-6 個月）
- ✅ 監控使用量，注意異常模式
- ✅ 不要在公開場合分享 API Key
- ✅ 如果 API Key 洩露，立即撤銷並重新生成

