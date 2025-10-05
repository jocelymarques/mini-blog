const About = () => {
    return (
        <div className="min-h-screen pt-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About</h1>
                <div className="prose dark:prose-invert">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Welcome to our mini blog! This is a simple blog application built with Next.js and Firebase.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                        Here you can find articles, tutorials, and thoughts about web development, technology, and more.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;