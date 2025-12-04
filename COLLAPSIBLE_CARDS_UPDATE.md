# Career Goals 可摺疊卡片更新

## 改進原因
原本的 Career Goals 區塊一次過顯示所有內容(Steps to Reach My Goal 和 Necessary Skills to Learn),篇幅過長,可能讓訪客感到壓迫和不耐煩。

## 解決方案
實作**可摺疊互動卡片**設計,讓訪客可以選擇性地展開感興趣的內容:

### 主要特色

1. **預設摺疊狀態**
   - Steps 和 Skills 兩個卡片預設為摺疊狀態
   - 只顯示標題和圖示,保持頁面簡潔
   - 減少初始視覺負擔

2. **點擊展開/收合**
   - 點擊卡片標題可展開查看完整內容
   - 再次點擊可收合回原狀態
   - 流暢的動畫過渡效果

3. **視覺提示**
   - 右側顯示向下箭頭圖示(▼)
   - 滑鼠懸停時箭頭變色,提示可點擊
   - 展開時箭頭旋轉180度(▲)
   - 標題區域懸停時會向右微移,增強互動感

4. **平滑動畫**
   - 使用 cubic-bezier 緩動函數
   - 高度、透明度、內邊距同步過渡
   - 展開時間 0.6 秒,收合時間 0.5 秒

5. **智慧滾動**
   - 展開後若卡片標題超出螢幕上方
   - 自動平滑滾動到合適位置
   - 確保完整內容可見

## 技術實作

### HTML 結構
```html
<div class="goal-card goal-card-wide stagger-item collapsible-card">
    <div class="card-header" onclick="toggleCard(this)">
        <div class="header-content">
            <div class="goal-icon">
                <i class="fas fa-route"></i>
            </div>
            <h3>Steps to Reach My Goal</h3>
        </div>
        <i class="fas fa-chevron-down toggle-icon"></i>
    </div>
    <div class="card-content collapsed">
        <!-- 實際內容 -->
    </div>
</div>
```

### CSS 關鍵樣式
- `.collapsible-card`: 容器設定
- `.card-header`: 可點擊標題區域,hover 效果
- `.toggle-icon`: 箭頭圖示,旋轉動畫
- `.card-content`: 內容區域,控制高度、透明度、內距過渡
- `.card-content.collapsed`: 摺疊狀態(max-height: 0, opacity: 0)
- `.card-content.expanded`: 展開狀態(max-height: 4000px, opacity: 1)

### JavaScript 功能
```javascript
function toggleCard(header) {
    const content = header.nextElementSibling;
    
    // 切換展開/摺疊狀態
    header.classList.toggle('expanded');
    content.classList.toggle('collapsed');
    content.classList.toggle('expanded');
    
    // 智慧滾動到合適位置
    if (content.classList.contains('expanded')) {
        setTimeout(() => {
            const rect = header.getBoundingClientRect();
            if (rect.top < 100) {
                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
}
```

## 響應式設計
在手機螢幕上:
- 箭頭圖示縮小至 1.2rem
- 標題文字大小調整為 1.1rem
- 展開內容的上邊距減少至 1.5rem
- 保持流暢的互動體驗

## 使用者體驗改善
✅ **減少初始認知負擔** - 只顯示標題,不會被長篇內容壓倒  
✅ **賦予選擇權** - 訪客可選擇查看感興趣的部分  
✅ **保留完整資訊** - 內容沒有刪減,只是隱藏起來  
✅ **提升互動性** - 增加網站的動態感和現代感  
✅ **更好的行動體驗** - 在手機上滾動更輕鬆  

## 注意事項
- Career Goal Statement 卡片保持不可摺疊,因為它是核心目標描述
- 只有 Steps 和 Skills 兩張卡片可摺疊
- 預設為摺疊狀態,訪客需主動點擊展開
- 可以同時展開兩張卡片,互不影響
