// On attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    const notificationFab = document.getElementById('notification-fab');
    const notificationPanel = document.getElementById('notification-panel');
    const notificationList = document.getElementById('notification-list');
    const notificationBadge = document.getElementById('notification-badge');
    const closePanel = document.getElementById('close-panel');

    // Vérifier si les éléments existent sur la page
    if (!notificationFab || !notificationPanel) return;

    // --- ACTION : OUVRIR / FERMER ---
    notificationFab.onclick = (e) => {
        e.preventDefault();
        notificationPanel.classList.toggle('active');
        console.log("Cloche cliquée"); // Pour déboguer dans la console
    };

    if (closePanel) {
        closePanel.onclick = () => notificationPanel.classList.remove('active');
    }

    // --- LOGIQUE FIREBASE ---
    // On s'assure que Firebase est initialisé
    if (typeof firebase !== 'undefined') {
        const dbNotif = firebase.firestore();

        dbNotif.collection("Notifications").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            notificationList.innerHTML = '';
            let count = snapshot.size;

            // Mise à jour du badge
            if (count > 0) {
                notificationBadge.style.display = 'flex';
                notificationBadge.textContent = count;
            } else {
                notificationBadge.style.display = 'none';
            }

            // Remplissage de la liste
            snapshot.forEach((doc) => {
                const notif = doc.data();
                const item = document.createElement('div');
                item.className = 'p-4 border-b border-gray-100 hover:bg-gray-50 transition';
                item.innerHTML = `
                    <div class="font-bold text-blue-900 text-sm">${notif.title}</div>
                    <div class="text-xs text-gray-600 mt-1">${notif.message}</div>
                `;
                notificationList.appendChild(item);
            });

            if (snapshot.empty) {
                notificationList.innerHTML = '<div class="p-6 text-center text-gray-400 text-xs">Aucune notification pour le moment.</div>';
            }
        }, (error) => {
            console.error("Erreur Firebase Notifications:", error);
        });
    }
});
