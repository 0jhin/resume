const projectData = {
    'DutyTable': {
        subtitle: '지인과 함께하는 채팅 기반 공유 캘린더',
        period: '2025.11.21 ~ 2026.01.13',
        role: '팀장 | 서비스 설계, 앱 개발, 출시 리드',
        stack: 'Flutter, Firebase(FCM), Supabase, Provider, MVVM',
        achievements: ['API 리소스 60% 절감', 'Android/iOS 크로스 플랫폼 출시 성공'],
        tasks: [
            '서비스 기획 및 RDBMS/Storage 인프라 설계 (Supabase)',
            'Firebase Cloud Messaging(FCM) 기반 푸시 알림 및 헤드업 알림 구현',
            '개인/공유 캘린더 엔진 및 홈 위젯(AOS/iOS) 개발',
            'Apple/Google OAuth 소셜 로그인 연동'
        ],
        troubleshooting: [
            {
                problem: "데이터 필터링 시 발생하는 반복적인 서버 호출로 인한 API 리소스 낭비 예상",
                solution: "페이지 진입 시 전체 데이터를 사전 로딩(Pre-loading)하고, 클라이언트 단에서 필터링을 수행하여 API 호출 횟수 60% 이상 절감"
            },
            {
                problem: "지도 영역 스크롤 시 시스템 스크롤과의 간섭으로 인한 조작 이질감 발생",
                solution: "제스처 우선권(Gesture Arena) 설정을 통해 지도 영역 내 터치를 우선 인식하도록 최적화하여 부드러운 지도 이동 구현"
            }
        ]
    },
    'Of Course': {
        subtitle: '맞춤형 코스 추천 및 토론 커뮤니티',
        period: '2025.10.29 ~ 2025.11.21',
        role: '팀원 | 인증 시스템 및 실시간 기능 개발',
        stack: 'Flutter, Supabase Realtime, Provider, Naver Map SDK',
        achievements: ['Supabase 기반 인증 시스템 및 실시간 알림 기능 성공적 구현'],
        tasks: [
            'Supabase Auth를 통한 구글 로그인 및 회원 관리(가입/탈퇴) 로직 전담',
            'Supabase Realtime을 활용한 사용자 간 실시간 인터랙션 알림 구현',
            '사용자 경험 개선을 위한 앱 온보딩 프로세스 구축',
            '코드 리뷰 및 디버깅을 통한 전체적인 앱 안정성 피드백 수행'
        ]
    },
    '커픽 - Coffick': {
        subtitle: '사용자 목적 중심의 테마별 카페 큐레이션 서비스',
        period: '2025.09.12 ~ 2025.09.18',
        role: '1인 개발 | 기획, 디자인, 전체 개발',
        stack: 'Jetpack Compose, Kotlin, Coroutine, Kakao Local API',
        achievements: ['네트워크 트래픽 60% 이상 최적화'],
        tasks: [
            'Jetpack Compose 기반의 현대적인 안드로이드 UI 구조 설계',
            'Naver 지도 API 연동 및 커스텀 마커/클러스터링 기능 구현',
            'Kakao Local API를 활용한 위치 기반 장소 검색 기능 구축'
        ],
        troubleshooting: [
            {
                problem: "GPS 수신 지연으로 인해 스플래시 이후 지도 위치가 급격히 점프하는 현상",
                solution: "Kotlin Coroutine을 사용하여 위치 정보 수신 완료 시점과 스플래시 종료 시점을 동기화하여 자연스러운 화면 진입 구현"
            },
            {
                problem: "지도 이동 시마다 발생하는 무분별한 API 요청으로 인한 리소스 소모",
                solution: "이벤트 기반 호출(현재 위치에서 재검색 버튼) 전략으로 전환하여 불필요한 네트워크 통신 차단 및 트래픽 60% 절감"
            }
        ]
    }
};

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.closest('.project-links') || e.target.closest('.launch-buttons')) return;

        const title = item.querySelector('.project-title').innerText;
        const data = projectData[title];

        if (data) {
            // 1. 문제 및 해결 과정 섹션: 데이터가 있을 때만 생성
            const troubleshootingSection = data.troubleshooting && data.troubleshooting.length > 0 ? `
                <div class="modal-section" style="margin-bottom: 24px;">
                    <strong style="display: block; margin-bottom: 8px; color: #1d1d1f; border-left: 4px solid #0071e3; padding-left: 8px;">문제 및 해결 과정</strong>
                    ${data.troubleshooting.map(ts => `
                        <div style="margin-bottom: 12px; background: #f5f5f7; padding: 12px; border-radius: 8px;">
                            <p style="font-weight: 700; font-size: 0.9rem; color: #1d1d1f; margin-bottom: 4px;">Q: ${ts.problem}</p>
                            <p style="font-size: 0.9rem; color: #424245;">A: ${ts.solution}</p>
                        </div>
                    `).join('')}
                </div>
            ` : '';

            // 2. 주요 성과 섹션: 데이터가 있을 때만 생성 (추가된 부분)
            const achievementsSection = data.achievements && data.achievements.length > 0 ? `
                <div class="modal-section" style="margin-bottom: 24px;">
                    <strong style="display: block; margin-bottom: 8px; color: #1d1d1f; border-left: 4px solid #0071e3; padding-left: 8px;">주요 성과</strong>
                    <ul style="list-style: none; padding: 0; font-size: 0.95rem; color: #424245;">
                        ${data.achievements.map(achievement => `<li style="margin-bottom: 4px; padding-left: 14px; position: relative;"><span style="position: absolute; left: 0; color: #0071e3;">✓</span> ${achievement}</li>`).join('')}
                    </ul>
                </div>
            ` : '';

            modalBody.innerHTML = `
                <div class="modal-header" style="margin-bottom: 24px;">
                    <h3 class="modal-title" style="margin-bottom: 4px;">${title}</h3>
                    <p style="color: #0071e3; font-weight: 700; font-size: 1.1rem; margin-bottom: 4px;">${data.subtitle}</p>
                    <p style="color: #86868b; font-size: 0.9rem;">${data.period} | ${data.role}</p>
                </div>

                <div class="modal-section" style="margin-bottom: 24px;">
                    <strong style="display: block; margin-bottom: 8px; color: #1d1d1f; border-left: 4px solid #0071e3; padding-left: 8px;">주요 역할</strong>
                    <ul style="list-style: none; padding: 0; font-size: 0.95rem; color: #424245;">
                        ${data.tasks.map(task => `<li style="margin-bottom: 6px; padding-left: 14px; position: relative;"><span style="position: absolute; left: 0;">•</span> ${task}</li>`).join('')}
                    </ul>
                </div>

                ${troubleshootingSection}
                ${achievementsSection}

                <div style="padding-top: 16px; border-top: 1px solid #eee; font-size: 0.85rem; color: #86868b;">
                    <p><strong>기술 스택:</strong> ${data.stack}</p>
                </div>
            `;
            modal.showModal();
        }
    });
});

closeBtn.addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });