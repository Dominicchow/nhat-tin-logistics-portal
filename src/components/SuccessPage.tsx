
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe, ArrowRight } from 'lucide-react';

interface SuccessPageProps {
    // Thêm các props khác nếu cần
}

const SuccessPage: React.FC<SuccessPageProps> = () => {
    // Tự động chuyển hướng đã bị gỡ bỏ theo yêu cầu của người dùng
    
    useEffect(() => {
        // Tự động chuyển hướng đã bị gỡ bỏ.
        // Chỉ giữ lại hiệu ứng hoặc các logic khác nếu cần.
    }, []);

    return (
        <div className="success-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            padding: '20px',
            textAlign: 'center'
        }}>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.4)'
                }}
            >
                <CheckCircle2 size={60} color="white" />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '12px'
                }}
            >
                Kết nối thành công!
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    fontSize: '16px',
                    color: '#64748b',
                    maxWidth: '280px',
                    lineHeight: '1.6',
                    marginBottom: '32px'
                }}
            >
                Chào mừng bạn đến với mạng Wi-Fi<br/> 
                <strong>Nhất Tín Logistics</strong>
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="loading-bar-container"
                style={{
                    width: '100%',
                    maxWidth: '240px',
                    height: '6px',
                    background: '#e2e8f0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '16px'
                }}
            >
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "linear" }}
                    style={{
                        height: '100%',
                        background: '#e31a1a',
                    }}
                />
            </motion.div>

            <p style={{
                    fontSize: '14px',
                    color: '#94a3b8',
                    marginBottom: '40px'
                }}>
                Bạn đã có thể sử dụng Internet.
            </p>

            <motion.a
                href="https://ntlogistics.vn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    background: 'white',
                    color: '#0f172a',
                    textDecoration: 'none',
                    borderRadius: '16px',
                    fontWeight: '700',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #e2e8f0'
                }}
            >
                <Globe size={20} />
                Vào ntlogistics.vn
                <ArrowRight size={18} />
            </motion.a>

            {/* Iframe ẩn gửi chuỗi ma thuật Aruba.InstantOn.Acknowledge cho AP */}
            <iframe 
                src="/accept.html" 
                style={{ display: 'none', width: 0, height: 0, border: 'none' }}
                title="aruba-ack"
            />
        </div>
    );
};

export default SuccessPage;
