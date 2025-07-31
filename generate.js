// 生成状态管理
let isGenerating = false;
let generationProgress = 0;
let generationTimer = null;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  console.log('生成页面已加载');
  
  try {
    // 检查页面元素是否正确加载
    const pageWrapper = document.querySelector('.page-wrapper');
    const visualPreview = document.querySelector('.visual-preview');
    const assistantPanel = document.querySelector('.assistant-panel');
    
    console.log('页面元素检查:', {
      pageWrapper: !!pageWrapper,
      visualPreview: !!visualPreview,
      assistantPanel: !!assistantPanel
    });
    
    // 确保页面可见
    document.body.style.display = 'block';
    
    // 开始全屏预览，然后滑入助手面板
    startFullscreenPreview();
    
  } catch (error) {
    console.error('页面初始化错误:', error);
  }
});

// 开始全屏预览
function startFullscreenPreview() {
  const visualPreview = document.querySelector('.visual-preview');
  const assistantPanel = document.querySelector('.assistant-panel');
  
  // 确保预览区全屏显示
  visualPreview.classList.remove('compressed');
  
  // 延迟后滑入助手面板
  setTimeout(() => {
    slideInAssistantPanel();
  }, 800);
}

// 滑入助手面板
function slideInAssistantPanel() {
  const visualPreview = document.querySelector('.visual-preview');
  const assistantPanel = document.querySelector('.assistant-panel');
  
  console.log('开始滑入助手面板');
  
  // 滑入助手面板
  assistantPanel.classList.add('slide-in');
  
  // 压缩预览区
  setTimeout(() => {
    console.log('压缩预览区');
    visualPreview.classList.add('compressed');
  }, 200);
  
  // 等待抽屉动画完成后先显示检索状态
  setTimeout(() => {
    console.log('抽屉动画完成，开始检索流程');
    startSearchProcess();
  }, 600); // 等待抽屉动画完成
}

// 开始检索流程
function startSearchProcess() {
  console.log('开始检索流程');
  
  // 隐藏状态项，只显示检索框
  const statusItem = document.querySelector('.status-item');
  const searchBox = document.querySelector('.search-box');
  
  if (statusItem) {
    statusItem.style.display = 'none';
  }
  
  if (searchBox) {
    searchBox.style.display = 'flex';
  }
  
  // 模拟检索过程
  setTimeout(() => {
    updateSearchStatus('检索网站1...');
  }, 1000);
  
  setTimeout(() => {
    updateSearchStatus('检索网站2...');
  }, 2000);
  
  setTimeout(() => {
    updateSearchStatus('检索网站3...');
  }, 3000);
  
  setTimeout(() => {
    updateSearchStatus('检索完成');
    console.log('检索完成，开始显示其他UI');
    showOtherUI();
  }, 4000); // 检索4秒
}

// 显示其他UI元素
function showOtherUI() {
  console.log('显示其他UI元素');
  
  // 显示状态项
  const statusItem = document.querySelector('.status-item');
  if (statusItem) {
    statusItem.style.display = 'flex';
  }
  
  // 显示助手消息
  const assistantMessage = document.querySelector('.assistant-message');
  if (assistantMessage) {
    assistantMessage.style.display = 'block';
  }
  
  // 显示版本部分
  const versionSection = document.querySelector('.version-section');
  if (versionSection) {
    versionSection.style.display = 'flex';
  }
  
  // 延迟后开始生成过程
  setTimeout(() => {
    console.log('UI显示完成，开始自动生成');
    startAutoGeneration();
  }, 2000);
}

// 自动开始生成（UI显示完成后调用）
function startAutoGeneration() {
  if (isGenerating) return;
  
  isGenerating = true;
  generationProgress = 0;
  
  // 更新按钮状态
  const generateBtn = document.querySelector('.generate-btn');
  const pauseBtn = document.querySelector('.pause-btn');
  generateBtn.disabled = true;
  generateBtn.textContent = '生成中...';
  pauseBtn.textContent = '暂停';
  
  // 更新底部文本
  const footerText = document.querySelector('.footer-text');
  if (footerText) {
    footerText.textContent = '正在自动生成您的网站...';
  }
  
  // 开始生成过程
  startGenerationProcess();
}

// 手动开始生成（用户点击按钮时调用）
function startGeneration() {
  if (isGenerating) return;
  startAutoGeneration();
}

// 暂停生成
function pauseGeneration() {
  if (!isGenerating) return;
  
  isGenerating = false;
  
  // 更新按钮状态
  const generateBtn = document.querySelector('.generate-btn');
  const pauseBtn = document.querySelector('.pause-btn');
  generateBtn.disabled = false;
  generateBtn.textContent = '继续生成';
  pauseBtn.textContent = '已暂停';
  
  // 清除定时器
  if (generationTimer) {
    clearInterval(generationTimer);
    generationTimer = null;
  }
}

// 生成过程
function startGenerationProcess() {
  const steps = [
    { progress: 10, message: '正在分析需求...', duration: 800 },
    { progress: 25, message: '检索相关模板...', duration: 1000 },
    { progress: 40, message: '设计页面结构...', duration: 900 },
    { progress: 60, message: '生成内容...', duration: 1000 },
    { progress: 80, message: '优化用户体验...', duration: 800 },
    { progress: 95, message: '完成生成...', duration: 600 },
    { progress: 100, message: '生成完成！', duration: 400 }
  ];
  
  let currentStep = 0;
  
  generationTimer = setInterval(() => {
    if (!isGenerating) return;
    
    const step = steps[currentStep];
    if (!step) {
      completeGeneration();
      return;
    }
    
    // 更新进度
    generationProgress = step.progress;
    updateProgress(generationProgress);
    
    // 更新状态消息
    updateStatus(step.message);
    
    // 填充内容占位符
    if (step.progress >= 40 && step.progress < 80) {
      fillContentPlaceholders(step.progress);
    }
    
    // 显示预览
    if (step.progress >= 60) {
      showPreview();
    }
    
    currentStep++;
  }, 800); // 减少间隔时间，让动画更流畅
}

// 更新状态消息
function updateStatus(message) {
  const statusText = document.querySelector('.status-text');
  if (statusText) {
    // 添加打字机效果
    statusText.textContent = '';
    statusText.classList.add('typing-effect');
    
    let i = 0;
    const typeWriter = () => {
      if (i < message.length) {
        statusText.textContent += message.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        statusText.classList.remove('typing-effect');
      }
    };
    typeWriter();
  }
}

// 更新进度
function updateProgress(progress) {
  console.log(`生成进度: ${progress}%`);
  
  // 更新进度条
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
  
  // 更新搜索框状态
  const searchText = document.querySelector('.search-text');
  if (searchText) {
    if (progress < 30) {
      searchText.textContent = '检索中...';
    } else if (progress < 60) {
      searchText.textContent = '生成中...';
    } else {
      searchText.textContent = '优化中...';
    }
  }
}

// 更新检索状态
function updateSearchStatus(status) {
  const searchText = document.querySelector('.search-text');
  if (searchText) {
    searchText.textContent = status;
  }
}

// 填充内容占位符
function fillContentPlaceholders(progress) {
  const placeholders = document.querySelectorAll('.content-placeholder');
  
  if (progress >= 40 && progress < 60) {
    placeholders[0].classList.add('filled');
    placeholders[0].innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="./assets/小绿.svg" alt="小绿" style="width: 16px; height: 16px;" />
        <span style="color: rgba(255,255,255,0.8); font-size: 14px;">首页设计 - 响应式布局，现代化UI</span>
      </div>
    `;
  }
  
  if (progress >= 50 && progress < 70) {
    placeholders[1].classList.add('filled');
    placeholders[1].innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="./assets/小绿.svg" alt="小绿" style="width: 16px; height: 16px;" />
        <span style="color: rgba(255,255,255,0.8); font-size: 14px;">投资产品展示 - 数据可视化，交互式图表</span>
      </div>
    `;
  }
  
  if (progress >= 60 && progress < 80) {
    placeholders[2].classList.add('filled');
    placeholders[2].innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="./assets/小绿.svg" alt="小绿" style="width: 16px; height: 16px;" />
        <span style="color: rgba(255,255,255,0.8); font-size: 14px;">用户管理系统 - 注册登录，个人中心</span>
      </div>
    `;
  }
}

// 显示预览
function showPreview() {
  const previewPlaceholder = document.querySelector('.preview-placeholder');
  const previewWebsite = document.getElementById('previewWebsite');
  
  if (previewPlaceholder && previewWebsite) {
    // 只有在生成完成时才显示预览
    if (generationProgress >= 100) {
      previewPlaceholder.style.display = 'none';
      previewWebsite.style.display = 'block';
      
      // 生成预览内容
      generatePreviewContent();
    }
  }
}

// 生成预览内容
function generatePreviewContent() {
  const previewWebsite = document.getElementById('previewWebsite');
  
  const websiteContent = `
    <div style="padding: 20px; font-family: 'Inter', sans-serif;">
      <header style="background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; padding: 30px; border-radius: 8px 8px 0 0; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; transform: translate(50%, -50%);"></div>
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">风险投资管理平台</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">专业的风险投资分析与决策支持系统</p>
      </header>
      
      <main style="padding: 30px; background: white;">
        <section style="margin-bottom: 40px;">
          <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 22px; font-weight: 600;">投资组合分析</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">
            <div style="border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; background: linear-gradient(145deg, #f8fafc, #f1f5f9);">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; margin-right: 10px;"></div>
                <h3 style="color: #1e3a8a; margin: 0; font-size: 18px; font-weight: 600;">高风险高收益</h3>
              </div>
              <p style="color: #64748b; margin: 0; line-height: 1.6;">预期年化收益率: 15-25%</p>
              <p style="color: #ef4444; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">风险等级: 高</p>
            </div>
            <div style="border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; background: linear-gradient(145deg, #f8fafc, #f1f5f9);">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%; margin-right: 10px;"></div>
                <h3 style="color: #1e3a8a; margin: 0; font-size: 18px; font-weight: 600;">平衡型投资</h3>
              </div>
              <p style="color: #64748b; margin: 0; line-height: 1.6;">预期年化收益率: 8-15%</p>
              <p style="color: #f59e0b; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">风险等级: 中</p>
            </div>
            <div style="border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; background: linear-gradient(145deg, #f8fafc, #f1f5f9);">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 12px; height: 12px; background: #3b82f6; border-radius: 50%; margin-right: 10px;"></div>
                <h3 style="color: #1e3a8a; margin: 0; font-size: 18px; font-weight: 600;">稳健型投资</h3>
              </div>
              <p style="color: #64748b; margin: 0; line-height: 1.6;">预期年化收益率: 5-10%</p>
              <p style="color: #3b82f6; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">风险等级: 低</p>
            </div>
          </div>
        </section>
        
        <section style="margin-bottom: 30px;">
          <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 22px; font-weight: 600;">风险控制指标</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
            <div style="text-align: center; padding: 15px; background: #fef3c7; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: 700; color: #d97706;">VaR</div>
              <div style="font-size: 14px; color: #92400e;">风险价值</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #dbeafe; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: 700; color: #2563eb;">Sharpe</div>
              <div style="font-size: 14px; color: #1e40af;">夏普比率</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #dcfce7; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: 700; color: #16a34a;">Beta</div>
              <div style="font-size: 14px; color: #15803d;">贝塔系数</div>
            </div>
          </div>
        </section>
        
        <section style="margin-bottom: 30px;">
          <h2 style="color: #1e3a8a; margin-bottom: 15px; font-size: 22px; font-weight: 600;">核心优势</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
            <div style="display: flex; align-items: center; padding: 10px;">
              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
              <span style="color: #374151; font-weight: 500;">AI驱动的风险评估模型</span>
            </div>
            <div style="display: flex; align-items: center; padding: 10px;">
              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
              <span style="color: #374151; font-weight: 500;">实时市场数据分析</span>
            </div>
            <div style="display: flex; align-items: center; padding: 10px;">
              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
              <span style="color: #374151; font-weight: 500;">专业投资顾问团队</span>
            </div>
            <div style="display: flex; align-items: center; padding: 10px;">
              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
              <span style="color: #374151; font-weight: 500;">合规性监控系统</span>
            </div>
          </div>
        </section>
        
        <section style="margin-bottom: 30px;">
          <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 22px; font-weight: 600;">投资策略</h2>
          <div style="background: linear-gradient(145deg, #f8fafc, #f1f5f9); border-radius: 12px; padding: 25px; border: 2px solid #e5e7eb;">
            <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">量化投资策略</h3>
            <p style="color: #64748b; margin: 0 0 15px 0; line-height: 1.6;">基于机器学习和统计模型的量化投资策略，通过多因子模型识别市场机会，实现超额收益。</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
              <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                <div style="font-size: 20px; font-weight: 700; color: #10b981;">+15.2%</div>
                <div style="font-size: 12px; color: #64748b;">年化收益率</div>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                <div style="font-size: 20px; font-weight: 700; color: #3b82f6;">0.85</div>
                <div style="font-size: 12px; color: #64748b;">夏普比率</div>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                <div style="font-size: 20px; font-weight: 700; color: #f59e0b;">12.5%</div>
                <div style="font-size: 12px; color: #64748b;">最大回撤</div>
              </div>
            </div>
          </div>
        </section>
        
        <section style="margin-bottom: 30px;">
          <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 22px; font-weight: 600;">市场分析</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
              <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">宏观经济分析</h3>
              <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">GDP增长率、通货膨胀率、利率政策等宏观经济指标对投资市场的影响分析。</p>
              <div style="display: flex; align-items: center; margin-top: 15px;">
                <div style="width: 60px; height: 4px; background: #e5e7eb; border-radius: 2px; margin-right: 10px;">
                  <div style="width: 75%; height: 100%; background: #10b981; border-radius: 2px;"></div>
                </div>
                <span style="font-size: 12px; color: #64748b;">75% 正面影响</span>
              </div>
            </div>
            <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
              <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">行业趋势分析</h3>
              <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">新兴技术、政策变化、消费趋势等对特定行业发展的影响评估。</p>
              <div style="display: flex; align-items: center; margin-top: 15px;">
                <div style="width: 60px; height: 4px; background: #e5e7eb; border-radius: 2px; margin-right: 10px;">
                  <div style="width: 60%; height: 100%; background: #f59e0b; border-radius: 2px;"></div>
                </div>
                <span style="font-size: 12px; color: #64748b;">60% 稳定发展</span>
              </div>
            </div>
          </div>
        </section>
        
        <section style="margin-bottom: 30px;">
          <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 22px; font-weight: 600;">客户服务</h2>
          <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; border-radius: 12px; padding: 25px;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">专业投资顾问服务</h3>
            <p style="margin: 0 0 20px 0; opacity: 0.9; line-height: 1.6;">我们的专业团队为您提供个性化的投资建议和风险管理服务，确保您的投资目标得到最佳实现。</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
              <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700;">24/7</div>
                <div style="font-size: 12px; opacity: 0.8;">全天候服务</div>
              </div>
              <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700;">98%</div>
                <div style="font-size: 12px; opacity: 0.8;">客户满意度</div>
              </div>
              <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700;">10+</div>
                <div style="font-size: 12px; opacity: 0.8;">年专业经验</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 25px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #64748b; font-size: 14px;">© 2024 风险投资管理平台. 专业投资，智能风控.</p>
      </footer>
    </div>
  `;
  
  previewWebsite.innerHTML = websiteContent;
}

// 完成生成
function completeGeneration() {
  isGenerating = false;
  
  // 更新按钮状态
  const generateBtn = document.querySelector('.generate-btn');
  const pauseBtn = document.querySelector('.pause-btn');
  generateBtn.disabled = false;
  generateBtn.textContent = '重新生成';
  pauseBtn.textContent = '暂停';
  
  // 清除定时器
  if (generationTimer) {
    clearInterval(generationTimer);
    generationTimer = null;
  }
  
  // 更新最终状态
  updateStatus('生成完成！');
  
  // 更新底部文本
  const footerText = document.querySelector('.footer-text');
  if (footerText) {
    footerText.textContent = '网站生成完成！您可以查看预览效果。';
  }
  
  // 显示左侧预览内容
  showPreview();
  
  console.log('网站生成完成');
}

// 返回首页
function goBack() {
  window.location.href = 'index.html';
} 