class ModelMixin():
    def __init__(self, **kwargs):
        for key, value in kwargs.iteritems():
            if not hasattr(self, key):
                raise Exception("Key: %s not found on model %s" % (key, self))

            setattr(self, key, value)
