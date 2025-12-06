"use client";

import { useState, useEffect } from 'react';
import { authService } from '../lib/auth-service';
import Link from 'next/link';
import './dashboard.css';

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Загрузка...</div>;
  }

  if (!currentUser) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Доступ запрещен</h1>
        <p>Войдите в систему чтобы увидеть личный кабинет</p>
        <Link href="/" style={{ color: '#080857ff', textDecoration: 'underline' }}>
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (

    <div className='block'>
      <header>
        <h1 style={{ color: '#100857ff' }}>Личный кабинет</h1>
      </header>
      

      <div style={{ 
        background: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '20px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#0c0857ff', marginBottom: '20px' }}>Ваш профиль</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Основная информация</h3>
            <p><strong>Имя:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>ID:</strong> {currentUser.id}</p>
          </div>
          
          <div style={{ background: 'white', padding: '20px', borderRadius: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Статистика</h3>
            <p><strong>Дата регистрации:</strong> {new Date(currentUser.created_at || Date.now()).toLocaleDateString('ru-RU')}</p>
            <p><strong>Статус:</strong> Активен</p>
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '20px',
          marginBottom: '30px'
          
        }}>
          <h3 style={{ color: '#0b0857ff', marginTop: 0 }}>Быстрые действия</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link href="/blog" className='blog'>
              Создать пост в блоге
            </Link>
          </div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '20px' }}>
          <button 
            onClick={() => {
              if (confirm('Вы уверены что хотите удалить аккаунт? Это действие нельзя отменить.')) {
                authService.deleteAccount(currentUser.id);
                window.location.href = '/';
              }
            }}
            className='delete'
          >
            Удалить аккаунт
          </button>
          <button onClick={handleLogout} className='link'>
            Выйти
          </button>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            Внимание: Это удалит ваш аккаунт и все связанные данные.
          </p>
        </div>
      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        <p>Личный кабинет пользователя • {new Date().getFullYear()}</p>
      </footer>
    </div>

  );
}