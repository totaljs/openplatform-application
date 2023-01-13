// App's permissions:
OpenPlatform.permissions.push({ name: 'Read', value: 'read' });
OpenPlatform.permissions.push({ name: 'Write', value: 'write' });

// Download UI locally
COMPONENTATOR('ui', 'exec,locale,intranetcss');

// Localization
ON('locale', req => (req.user ? req.user.language : req.query.language) || '');