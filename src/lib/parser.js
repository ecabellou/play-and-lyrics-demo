import mammoth from 'mammoth';

export const parserService = {
    async parseFile(file) {
        const extension = file.name.split('.').pop().toLowerCase();

        if (extension === 'txt') {
            return this.parseTxt(file);
        } else if (extension === 'docx') {
            return this.parseDocx(file);
        } else {
            throw new Error('Formato no soportado. Usa .txt o .docx');
        }
    },

    parseTxt(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    content: e.target.result,
                    originalName: file.name
                });
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    },

    async parseDocx(file) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });

        // Simple HTML cleanup if needed, or just return as is
        // For lyrics, raw HTML from mammoth is usually okay, but we might want
        // to strip minimal styles later.
        return {
            title: file.name.replace(/\.[^/.]+$/, ""),
            content: result.value,
            originalName: file.name
        };
    }
};
